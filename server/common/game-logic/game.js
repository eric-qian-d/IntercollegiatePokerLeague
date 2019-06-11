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
  constructor(gameId, type, numPlayers, bigBlindValue, parentMatchId, userSocketMap, io, parentMatch) {
    this.id = gameId;
    this.type = type;
    this.numPlayers = numPlayers;
    this.bigBlindValue = bigBlindValue;
    this.parentMatchId = parentMatchId;
    this.parentMatch = parentMatch;
    this.buttonLocation = 0;
    this.seatMap = {};
    this.currentTotalRaise = 0;
    this.lastRaiseSize = bigBlindValue;
    this.lastRaiser = 1; //default for HU, needs to be changed
    this.action = 0; //default for HU, needs to be changed
    this.pot = 0;
    this.deck = new Deck();
    this.board = [];
    this.time = 30;
    this.userSocketMap = userSocketMap;
    this.animateNextStreet = false;
    this.animateWin = false;
    this.animateCtr = 1;
    this.io = io;
    this.finished = false;
    for(var i = 0; i < numPlayers; i++) {
      this.seatMap[i] = "";
    };
  }


  timerLogic(obj) {
    if (obj.animateNextStreet) {
      //need to animate the next street
      obj.animateNextStreet = false;
      obj.aniamteCtr = 1;
      // console.log(obj);
    } else if (obj.animateWin) {
      //need to animate a player winning the pot
      obj.animateWin = false;
      obj.animateCtr = 2;

      if (obj.finished) {

      } else {
        obj.startHand();
      }

    } else {
      if (obj.animateCtr > 0) {
        //waiting for animation to finish
        obj.animateCtr--;
        // console.log('ticking down');
        // console.log(obj);
      } else {
        if (obj.finished) {
          console.log('in timer but this is finished');
          const info = obj.getGameState(null, true);
          Object.values(obj.seatMap).forEach(basePlayer => {
            // const allPlayerInfo = [];


            obj.io.to(obj.userSocketMap[basePlayer.id]).emit("GAME STATE", info[0], info[1]);
          })
        } else {
          //just ticking waiting for player to act
          obj.time--;
          //logic for out of time

          obj.emitAll();
        }

      }

    }


  }

  animate() {

  }


  /**
   * Adds a player to the poker game
   * @param {String} playerId   the UUID of the player to be added
   * @param {Integer} seatNumber seat position of the player
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  addPlayer(playerId, seatNumber, stackSize, playerName) {
    if (seatNumber < this.numPlayers && (this.seatMap[seatNumber] === "")) {
      this.seatMap[seatNumber] = new Player(playerId, seatNumber, stackSize, playerName);
    }
    const numPlayersJoined = Object.values(this.seatMap).filter(player => {
      return player !== "";
    }).length;
    if (numPlayersJoined >= 2) {
      setInterval(this.timerLogic, 1000, this);
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
    //deals players hands
    this.pot = 0;
    this.board = [];
    Object.values(this.seatMap).forEach(player => {
      if (player !== "") {
        player.hand = [];
        player.hand.push(this.deck.getNextCard());
        player.hand.push(this.deck.getNextCard());
        player.inHand = true;
      }
    });
    //moves button
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
      //heads up setup logic
      this.action = this.buttonLocation;
      this.seatMap[this.action].stackSize -= this.bigBlindValue/2;
      this.seatMap[this.action].investedStack += this.bigBlindValue/2;
      this.lastRaiser = this.action;
      advanced = false;
      var nextPlayer = this.buttonLocation;
      while (!advanced) {
        nextPlayer = (nextPlayer + 1) % this.numPlayers;
        if (this.seatMap[nextPlayer] !== "") {
          this.seatMap[nextPlayer].stackSize -= this.bigBlindValue;
          this.seatMap[nextPlayer].investedStack += this.bigBlindValue;

          this.currentTotalRaise = this.bigBlindValue;
          advanced = true;
        }
      }
    } else {
      //>2 people logic
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
            this.lastRaiser = nextPlayer;
            this.currentTotalRaise = this.bigBlindValue;
          }
          nextPlayer++;
        }
      }
    }
  }

  check(playerId) {
    if (this.isPlayersTurn(playerId)) {
      if (this.currentTotalRaise == 0) {
        //legal check
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
        const adaptedBoard = this.board.map(card => {
          return [card.suit, card.rank];
        });
        this.emitAll();
      }
    }
  }

  /**
   * Logic for having the player call the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId the UUID of the player
   * @return {Boolean}         True if the call is legal (correct turn) and went through, False otherwise
   */
  call(playerId) {
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      const needToCall = this.currentTotalRaise - player.investedStack;
      if (player.stackSize - (needToCall) < 0) {
        //player goes all in to call: need to take care of side pots later on. Also need to take care of the case of all-ins
        player.investedStack += player.stackSize;
        player.stackSize = 0;
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
      this.time = 30;
      this.emitAll();
      if (this.action === this.lastRaiser) {
        this.nextStreet();
      }

    }
  }

  /**
   * Logic for having the player raise the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId    the UUID of the player
   * @param  {Integer} finalAmount the final amount to be raised to
   * @return {Boolean}             True if the raise is legal (correct turn and valid raise size) and False otherwise.
   */
  raise(playerId, finalAmount) {
    //make sure raise is legal
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      const raiseDelta = finalAmount - player.investedStack;
      if (raiseDelta > player.stackSize || raiseDelta > this.lastRaiseSize) {
        //legal raise
        if (raiseDelta > player.stackSize) {
          //player needs to go all in to raise
          player.investedStack += player.stackSize;
          player.stackSize = 0;
        } else {
          player.investedStack += raiseDelta;
          player.stackSize -= raiseDelta;
        }
        this.lastRaiser = this.action;
        this.lastRaiseSize = raiseDelta;
        this.currentTotalRaise = finalAmount;
        var advanced = false;
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          console.log(this.action);
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }
        const adaptedBoard = this.board.map(card => {
          return [card.suit, card.rank];
        });
        this.time = 30;
        this.emitAll();
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
  fold(playerId) {
    if (this.isPlayersTurn(playerId)) {
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      player.inHand = false;
      var advanced = false;
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      const playersInHandList = Object.values(this.seatMap).filter(player => {
        return player.inHand;
      });
      this.time = 30;
      this.emitAll();
      const numPlayersInHand = playersInHandList.length;
      if (this.action === this.lastRaiser || numPlayersInHand == 1) {
        this.nextStreet();
      }

    }
  }

  nextStreet() {
    //gets a list of all the players still in the hand
    const playersInHandList = Object.values(this.seatMap).filter(player => {
      return player.inHand;
    });
    const numPlayersInHand = playersInHandList.length;
    if (numPlayersInHand === 1) {
      this.animateWin = true;
      //one player won
      //gives player the pot
      Object.values(this.seatMap).forEach(player => {
        if (player.investedStack > 0) {
          this.pot += player.investedStack;
          player.investedStack = 0;
        }
      })
      playersInHandList[0].stackSize += this.pot;
    } else {
      //moves to next street
      this.animateNextStreet = true;
      //adds bets to pot
      this.lastRaiseSize = 0;
      this.currentTotalRaise = 0;
      Object.values(this.seatMap).forEach(player => {
        if (player.investedStack > 0) {
          this.pot += player.investedStack;
          player.investedStack = 0;
        }
      })
      if (this.board.length === 0) {
        //preflop finish
        //deal flop
        for(var i = 0; i < 3; i++) {
          this.board.push(this.deck.getNextCard())
        }
        var advanced = false;
        this.action = this.buttonLocation;
        //finds the player who is going first on the flop
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            //sets lastRaiser so that when it gets back to this player, nextStreet() is called
            this.lastRaiser = this.action;
            advanced = true;
          }
        }
      } else if (this.board.length === 3 || this.board.length === 4) {
        //flop finish
        //deal turn
        this.board.push(this.deck.getNextCard());
        var advanced = false;
        this.action = this.buttonLocation;
        //finds the player who is going first on the turn
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            //sets lastRaiser so that when it gets back to this player, nextStreet() is called
            this.lastRaiser = this.action;
            advanced = true;
          }
        }
      } else if (this.board.length === 5) {
        //river finish

        //display both hands
        const info = this.getGameState(null, true);
        Object.values(this.seatMap).forEach(basePlayer => {
          // const allPlayerInfo = [];


          this.io.to(this.userSocketMap[basePlayer.id]).emit("GAME STATE", info[0], info[1]);
        })

        var currentStrongestHandStrength = 0;
        var winners = [];
        console.log('getting hand strengths');
        playersInHandList.forEach(player => {
          const playerHandStrength = hand.getRanking(player.hand, this.board);
          if (playerHandStrength == currentStrongestHandStrength) {
            winners.push(player);
          } else if (playerHandStrength > currentStrongestHandStrength) {
            currentStrongestHandStrength = playerHandStrength;
            winners = [player];
          }
        })

        Object.values(this.seatMap).forEach(player => {
          if (player.investedStack > 0) {
            this.pot += player.investedStack;
            player.investedStack = 0;
          }
        })
        //todo: split so that not evenly divisible things
        winners.forEach(player => {
          player.stackSize += Math.round(this.pot/winners.length);
        })
        const listOfLivePlayers = Object.values(this.seatMap).filter(player => {
          return player.stackSize > 0;
        })
        if (listOfLivePlayers.length === 1) {
          //we have a winner
          this.finished = true;
          const winnerId = listOfLivePlayers[0].id;
          if (this.parentMatch !== null) {
            //this game is part of a team match
            this.parentMatch.games[this.id].winner = winnerId;
            const numRemainingMatches = Object.values(this.parentMatch.games).filter(game => {
              return game.winner === 'none';
            }).length;
            if (numRemainingMatches === 0) {
              this.parentMatch.end();
            }
          }

        }

        this.pot = 0;
        this.animateWin = true;

        // winner.stackSize += this.pot;
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
        // console.log(player.seatNumber);
        thisPlayerSeatNumber = player.seatNumber;
      }
    })
    return thisPlayerSeatNumber === this.action;
  }

  emitAll() {
    Object.values(this.seatMap).forEach(basePlayer => {
      const info = this.getGameState(basePlayer.id);
      console.log(info[1]);
      this.io.to(this.userSocketMap[basePlayer.id]).emit("GAME STATE", info[0], info[1]);
    })
  }

  /**
   * Returns a String representing the game state as defined in wire-protocol.txt
   * @param  {String} playerId the UUID of the player
   * @return {String}          a representation of the game state for the SPECIFIC PLAYER as defined in wire-protocol.txt
   */
  getGameState(playerId, all = false){
    const adaptedBoard = this.board.map(card => {
      return [card.rank, card.suit];
    });
    const gameInfo = [this.numPlayers, this.buttonLocation, this.action, this.pot, adaptedBoard, this.time];
    const allPlayerInfo = [];
    const adjustedPlayersList = Object.values(this.seatMap).map(secondaryPlayer => {
      var hand;
      if (!all) {
        if (secondaryPlayer.id === playerId) {
          hand = [[secondaryPlayer.hand[0].rank.toString(), secondaryPlayer.hand[0].suit], [secondaryPlayer.hand[1].rank.toString(), secondaryPlayer.hand[1].suit]];
        } else {
          hand = [["none", "none"], ["none", "none"]];
        }
      } else {
        hand = [[secondaryPlayer.hand[0].rank.toString(), secondaryPlayer.hand[0].suit], [secondaryPlayer.hand[1].rank.toString(), secondaryPlayer.hand[1].suit]];
      }


      return (
        {
          name: secondaryPlayer.playerName,
          hand: hand,
          stackSize: secondaryPlayer.stackSize,
          investedStack: secondaryPlayer.investedStack,
          inHand: secondaryPlayer.inHand

        }
      )
    });
    return [gameInfo, adjustedPlayersList];
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
