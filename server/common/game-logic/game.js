var Deck = require("./deck");
var Player = require("./player");
var gameType = require("./gameType");
var hand = require("./hand");

module.exports = class Game { // maybe rename this to be Table
  /**
   * Creates a new poker game
   * @param {String} gameId UUID of the game
   * @param {gameType} type   type of game
   */
  constructor(gameId, type, numPlayers, bigBlindValue, parentMatchId) {
    this.id = gameId;
    this.type = type;
    this.numPlayers = numPlayers;
    this.bigBlindValue = bigBlindValue;
    this.parentMatchId = parentMatchId;
    this.buttonLocation = 0;
    this.seatMap = {};
    this.currentTotalRaise = 0;
    this.lastRaiseSize = bigBlindValue;
    this.lastRaiser = 1; //default for HU, needs to be changed
    this.action = 0 //default for HU, needs to be changed
    this.pot = 0;
    this.deck = new Deck();
    this.board = [];
    for(var i = 0; i < numPlayers; i++) {
      this.seatMap[i] = "";
    };
  }




  /**
   * Adds a player to the poker game
   * @param {String} playerId   the UUID of the player to be added
   * @param {Integer} seatNumber seat position of the player
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  addPlayer(playerId, seatNumber, stackSize) {
    if (seatNumber < this.numPlayers && (this.seatMap[seatNumber] === "")) {
      this.seatMap[seatNumber] = new Player(playerId, seatNumber, stackSize);
    }
    const numPlayersJoined = Object.values(this.seatMap).filter(player => {
      return player !== "";
    }).length;
    if (numPlayersJoined >= 2) {
      console.log(this.seatMap);
      this.startHand();
    }
  }

  /**
   * Removes a player from the poker game
   * @param {String} playerId   the UUID of the player
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  removePlayer(playerId) {

  }

  //game logic
  //

  /**
   * Begins new hand. Moves the button and deals cards to everyone that was present at the Table
   * when this function was first called
   */
  startHand() {
    Object.values(this.seatMap).forEach(player => {
      if (player !== "") {
        player.hand = [];
        player.hand.push(this.deck.getNextCard());
        player.hand.push(this.deck.getNextCard());
      }
    });
    var advanced = false;
    while (!advanced) {
      this.buttonLocation = (this.buttonLocation + 1) % this.numPlayers;
      if (this.seatMap[this.action] !== "") {
        advanced = true;
      }
    }
    const numPlayersJoined = Object.keys(this.seatMap).filter(player => {
      return player !== "";
    }).length;
    if (numPlayersJoined == 2) {
      this.action = this.buttonLocation;
      console.log(this.seatMap);
      this.seatMap[this.action].stackSize -= this.bigBlindValue/2;
      this.seatMap[this.action].investedStack += this.bigBlindValue/2;
      advanced = false;
      var nextPlayer = this.buttonLocation;
      while (!advanced) {
        nextPlayer = (nextPlayer + 1) % this.numPlayers;
        if (this.seatMap[nextPlayer] !== "") {
          console.log(nextPlayer);
          console.log(this.seatMap[nextPlayer]);
          this.seatMap[nextPlayer].stackSize -= this.bigBlindValue;
          this.seatMap[nextPlayer].investedStack += this.bigBlindValue;
          advanced = true;
        }
      }
    } else {
      this.action = this.buttonLocation;
      var advanced = 0;
      var nextPlayer = this.buttonLocation;
      while (advanced < 2) {
        this.nextPlayer = (this.nextPlayer + 1) % this.numPlayers;
        if (this.seatMap[nextPlayer] !== "") {
          if (advanced === 0) {
            this.seatMap[nextPlayer].stackSize -= this.bigBlindValue/2;
            this.seatMap[nextPlayer].investedStack += this.bigBlindValue/2;
          } else {
            this.seatMap[nextPlayer].stackSize -= this.bigBlindValue;
            this.seatMap[nextPlayer].investedStack += this.bigBlindValue;
          }
          nextPlayer++;
        }
      }
    }
  }

  // /**
  //  * Begins new hand. Moves the button and deals cards to everyone that was present at the Table
  //  * when this function was first called
  //  */
  // startHand() {
  //   var advanced = false;
  //   while (!advanced) {
  //     this.button = (this.button + 1) % this.numPlayers;
  //     if (seatMap[this.action] !== "") {
  //       advanced = true;
  //     }
  //   }
  //   this.deck = new Deck();
  //   Object.values(this.seatMap).forEach(player => {
  //     if (player !== "") {
  //       player.hand = [];
  //       player.hand.push(this.deck.getNextCard());
  //       player.hand.push(this.deck.getNextCard());
  //     }
  //   })
  // }

  /**
   * Logic for having the player call the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId the UUID of the player
   * @return {Boolean}         True if the call is legal (correct turn) and went through, False otherwise
   */
  call(playerId, playerSocketMap, io) {
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      const needToCall = this.currentTotalRaise - player.investedStack;
      if (player.stackSize - (needToCall) < 0) {
        player.investedStack += player.stackSize;
        this.stackSize = 0;
      } else {
        player.investedStack += needToCall;
        player.stackSize -= needToCall;
      }
      var advanced = false;
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      if (this.action === this.lastRaiser) {
        this.nextStreet();
      }
      const gameInfo = [this.numPlayers, this.buttonLocation, this.action, this.pot];
      Object.values(this.seatMap).forEach(basePlayer => {
        const allPlayerInfo = [];
        Object.values(this.seatMap).forEach(secondaryPlayer => {
          allPlayerInfo.push(secondaryPlayer);
        })
        io.to(playerSocketMap[basePlayer.id]).emit("GAME STATE", gameInfo, allPlayerInfo);
      })
      console.log(this);
    }

  }

  /**
   * Logic for having the player raise the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId    the UUID of the player
   * @param  {Integer} finalAmount the final amount to be raised to
   * @return {Boolean}             True if the raise is legal (correct turn and valid raise size) and False otherwise.
   */
  raise(playerId, finalAmount, playerSocketMap, io) {
    //make sure raise is legal
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      const raiseDelta = finalAmount - player.investedStack;
      if (raiseDelta > player.stackSize || raiseDelta > this.lastRaiseSize) {
        console.log("LEGAL RAISE");
        //legal raise
        if (raiseDelta > player.stackSize) {
          player.investedStack += player.stackSize;
          player.stackSize = 0;
        } else {
          player.investedStack += raiseDelta;
          player.stackSize -= raiseDelta;
        }
        this.lastRaiser = this.action;
        this.currentTotalRaise = finalAmount;
        var advanced = false;
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }

        const gameInfo = [this.numPlayers, this.buttonLocation, this.action, this.pot];
        Object.values(this.seatMap).forEach(basePlayer => {
          const allPlayerInfo = [];
          Object.values(this.seatMap).forEach(secondaryPlayer => {
            allPlayerInfo.push(secondaryPlayer);
          })
          io.to(playerSocketMap[basePlayer.id]).emit("GAME STATE", gameInfo, allPlayerInfo);
        })
      } else {
        //illegal raise logic
      }

    }
  }

  /**
   * Logic for having the player fold. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId the UUID of the player
   * @return {Boolean}         True if the fold is legal (correct turn) and went through, False otherwise
   */
  fold(playerId, playerSocketMap) {
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      this.inHand = false;
      var advanced = false;
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      if (this.action === this.lastRaiser) {
        this.nextStreet();
      }
      const gameInfo = [this.numPlayers, this.buttonLocation, this.action, this.pot];
      Object.values(this.seatMap).forEach(basePlayer => {
        const allPlayerInfo = [];
        Object.values(this.seatMap).forEach(secondaryPlayer => {
          allPlayerInfo.push(secondaryPlayer);
        })
        io.to(playerSocketMap[basePlayer.id]).emit("GAME STATE", gameInfo, allPlayerInfo);
      })
    }

  }

  nextStreet() {
    const playersInHandList = Object.values(this.seatMap).filter(player => {
      return player.inHand;
    });
    const numPlayersInHand = playersInHandList.length;
    if (numPlayersInHand === 1) {
      //one player won
      Object.values(this.seatMap).forEach(player => {
        if (player.investedStack > 0) {
          this.pot += player.investedStack;
          player.investedStack = 0;
        }
      })
      playersInHandList[0].stackSize += this.pot;
      this.startHand();
    } else {
      Object.values(this.seatMap).forEach(player => {
        if (player.investedStack > 0) {
          this.pot += player.investedStack;
          player.investedStack = 0;
        }
      })
      if (this.board.length === 0) {
        //preflop finish
        for(var i = 0; i < 3; i++) {
          this.board.push(this.deck.getNextCard())
        }
        var advanced = false;
        this.action = this.buttonLocation;
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }
      } else if (this.board.length === 3 || this.board.length === 4) {
        //flop finish
        this.board.push(this.deck.getNextCard())
        var advanced = false;
        this.action = this.buttonLocation;
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }
      } else if (this.board.length === 5) {
        //river finish

      }
    }

  }


  /**
   * Determines whether or not it's the player's turn
   * @param  {String}  playerId the UUID of the player
   * @return {Boolean}          True if it's the player's turn and False otherwise
   */
  isPlayersTurn(playerId) {
    var thisPlayerSeatNumber;
    Object.values(this.seatMap).forEach(player => {
      if (player.id === playerId) {
        console.log(player.seatNumber);
        thisPlayerSeatNumber = player.seatNumber;
      }
    })
    return thisPlayerSeatNumber === this.action;
  }

  /**
   * Returns a String representing the game state as defined in wire-protocol.txt
   * @param  {String} playerId the UUID of the player
   * @return {String}          a representation of the game state for the SPECIFIC PLAYER as defined in wire-protocol.txt
   */
  getGameState(playerId){
    const gameInfo = [this.numPlayers, this.buttonLocation, this.action, this.pot];
    const allPlayerInfo = [];
    Object.values(this.seatMap).forEach(secondaryPlayer => {
      allPlayerInfo.push(secondaryPlayer);
    })
    return [gameInfo, allPlayerInfo];
  }


  getPlayerIds() {
    return Object.values(this.seatMap)
    .filter(key => {
      return (key !== "");
    })
    .map(player => {
      return (
        player.id
      )
    });
  }


}
