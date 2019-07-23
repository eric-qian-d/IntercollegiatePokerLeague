var Deck = require("./deck");
var Player = require("./player");
var gameType = require("./gameType");
var hand = require("./hand");

module.exports = class Game { // maybe rename this to be Table
  /*
      gameId: UUID representing the game's id
      type: gameType representing the type of game
      numPlayers: the maximum number of players the game can hold
      bigBlindValue: the BB
      parentMatchId: the parent match's id
      parentMatch: the Match that wraps the Game
      buttonLocation: the seat number that the button is currently at
      seatMap: map where keys are integers representing seats, and values are Player objects or "" if no player is sitting there
      currentTotalRaise: the current maximum amount of money that was raised on the current street
      lastRaiseSize: the difference between the latest raise and the second to last raise
      action: the seat number of the player who is up to act
      pot: the current size of the pot, not including bets/raises on the current street
      deck: the game's Deck
      board: array representing the cards
      time: the time remaining for the current player's action
      maxTime: the time that each player has to act
      userSocketMap: global map of userId's to socketId's
      io: the io Object that is used for communication
      finished: whether or not the Game has ended
      allIn: whether or not only one player has the ability to act (same thing as 'should automatically run the next streets')
      timer: the object that will be doing the countdown, this is reset often

   */

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
    this.currentTotalRaise = bigBlindValue;
    this.lastRaiseSize = 0;
    this.lastRaiser = 1; //default for HU, needs to be changed
    this.action = 0; //default for HU, needs to be changed
    this.pot = 0;
    this.deck = new Deck();
    this.board = [];
    this.time = 30;
    this.maxTime = 30;
    this.userSocketMap = userSocketMap;
    this.io = io;
    this.finished = false;
    this.allIn = false;
    this.timer = null;
    for(var i = 0; i < numPlayers; i++) {
      this.seatMap[i] = "";
    };
  }

  /**
   * The logic to execute every second
   * @param  {Game} game the Game object that the timer is operating on
   */
  timerLogic(game) {
    if (!game.finished) {
      if (game.time == 0) {
        //current player has run out of time
        const playerToAct = game.seatMap[game.action];
        const playerToActId = playerToAct.id;
        game.fold(playerToActId);
      } else {
        //just ticking waiting for player to act
        game.time--;
        game.emitAll();
      }
    }
  }


  /**
   * Adds a player to the poker game
   * @param {String} playerId   the UUID of the player to be added
   * @param {Integer} seatNumber seat position of the player
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  addPlayer(playerId, seatNumber, stackSize, playerName) {
    //Will eventually need to do the check for multithreading
    if (seatNumber < this.numPlayers && (this.seatMap[seatNumber] === "")) {
      this.seatMap[seatNumber] = new Player(playerId, seatNumber, stackSize, playerName);
    }
    const numPlayersJoined = Object.values(this.seatMap).filter(player => {
      return player !== "";
    }).length;
    if (numPlayersJoined >= 2) {
      this.timer = setInterval(this.timerLogic, 1000, this);
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

  /**
   * Begins new hand. Moves the button and deals cards to everyone that was present at the Table
   * when this function was first called.
   *
   * Resets all round metadata
   */
  startHand() {
    //resets round data
    this.pot = 0;
    this.board = [];
    this.allIn = false;
    this.currentTotalRaise = this.bigBlindValue;
    this.lastRaiseSize = 0;
    this.time = this.maxTime;
    this.deck = new Deck();
    //deals players hands
    Object.values(this.seatMap).forEach(player => {
      if (player !== "") {
        const newHand = [];
        //separate this to prevent a player's hand from being empty at any given time
        newHand.push(this.deck.getNextCard());
        newHand.push(this.deck.getNextCard());
        player.hand = newHand;
        player.inHand = true;
        player.investedInHand = 0;
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
        //finds the next player, who will be the big blind
        nextPlayer = (nextPlayer + 1) % this.numPlayers;
        if (this.seatMap[nextPlayer] !== "") {
          this.seatMap[nextPlayer].stackSize -= this.bigBlindValue;
          this.seatMap[nextPlayer].investedStack += this.bigBlindValue;

          this.currentTotalRaise = this.bigBlindValue;
          advanced = true;
        }
      }
    } else {
      //>2 people setup logic
      this.action = this.buttonLocation;
      var advanced = 0;
      var nextPlayer = this.buttonLocation;
      while (advanced < 2) {
        this.nextPlayer = (this.nextPlayer + 1) % this.numPlayers;
        if (this.seatMap[nextPlayer] !== "") {
          if (advanced === 0) {
            //finds the next player, who will be the small blind
            this.seatMap[nextPlayer].stackSize -= this.bigBlindValue/2;
            this.seatMap[nextPlayer].investedStack += this.bigBlindValue/2;
          } else {
            //finds the next player, who will be the big blind
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
          //finds the next player to act
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }
        if (this.action === this.lastRaiser) {
          //everyone has acted
          this.nextStreet();
        }
        const adaptedBoard = this.board.map(card => {
          return [card.suit, card.rank];
        });
        this.emitAll();
      } else {
        //illegal check
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
      clearInterval(this.timer);
      const player = Object.values(this.seatMap).filter(player => {
        return player.id === playerId;
      })[0];
      const needToCall = this.currentTotalRaise - player.investedStack;
      if (player.stackSize - (needToCall) < 0) {
        //player goes all in to call: need to take care of side pots later on
        player.investedStack += player.stackSize;
        player.investedInHand += player.stackSize;
        player.stackSize = 0;
      } else {
        player.investedStack += needToCall;
        player.investedInHand += needToCall;
        player.stackSize -= needToCall;
      }
      var advanced = false;
      //finds the next player to act
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      if (this.action === this.lastRaiser) {
        this.action = null;
        this.emitAll();
        this.nextStreet();
      } else {
        this.time = this.maxTime;
        this.emitAll();
        this.timer = setInterval(this.timerLogic, 1000, this);
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
      // console.log(this.currentTotalRaise);
      // console.log(this.lastRaiseSize);
      // console.log(2 * this.currentTotalRaise - this.lastRaiseSize);
      if (finalAmount >= 2 * this.currentTotalRaise - this.lastRaiseSize) {
        clearInterval(this.timer)
        //legal raise
        if (raiseDelta > player.stackSize) {
          //player needs to go all in to raise
          player.investedStack += player.stackSize;
          player.investedInHand += player.stackSize;
          player.stackSize = 0;
        } else {
          player.investedStack += raiseDelta;
          player.investedInHand += raiseDelta;
          player.stackSize -= raiseDelta;
        }
        this.lastRaiser = this.action;
        this.lastRaiseSize = this.currentTotalRaise;
        this.currentTotalRaise = finalAmount;
        var advanced = false;
        //finds the next player to act
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
            advanced = true;
          }
        }
        if (this.action === this.lastRaiser) {
          this.action = null;
          this.emitAll();
          this.nextStreet();
        } else {
          this.time = this.maxTime;
          this.emitAll();
          this.timer = setInterval(this.timerLogic, 1000, this);
        }
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
      clearInterval(this.timer);
      player.inHand = false;
      var advanced = false;
      //finds the next player to act
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      const playersInHandList = Object.values(this.seatMap).filter(player => {
        return player.inHand;
      });

      const numPlayersInHand = playersInHandList.length;
      if (this.action === this.lastRaiser || numPlayersInHand == 1) {
        this.action = null;
        this.emitAll();
        this.nextStreet();
      } else {
        this.time = this.maxTime;
        this.emitAll();
        this.timer = setInterval(this.timerLogic, 1000, this);
      }

    }
  }

  nextStreet() {
    this.time = this.maxTime;
    //gets a list of all the players still in the hand
    const playersInHandList = Object.values(this.seatMap).filter(player => {
      return player.inHand;
    });
    const numPlayersInHand = playersInHandList.length;
    if (numPlayersInHand === 1) {
      //one player won
      //gives player the pot
      Object.values(this.seatMap).forEach(player => {
        if (player.investedStack > 0) {
          this.pot += player.investedStack;
          player.investedStack = 0;
        }
      })
      playersInHandList[0].stackSize += this.pot;
      setTimeout(() => {
        this.startHand();
        this.timer = setInterval(this.timerLogic, 1000, this);
      }, 2000);

    } else {
      //makes sure animation happens in next clock tick - to change this so that there's no timing issues
      //resets variables for the next street
      this.lastRaiseSize = this.bigBlindValue;
      this.currentTotalRaise = 0;

      //all in stack logic
      const inHandInvestedStacks = [];
      Object.values(this.seatMap).forEach(player => {
        if (player.inHand) {
          inHandInvestedStacks.push(player.investedStack);
        }
      });
      inHandInvestedStacks.sort(function(a, b){return b - a});
      if (inHandInvestedStacks[0] !== inHandInvestedStacks[1]) {
        //someone shoved over, and should get their money back
        Object.values(this.seatMap).forEach(player => {
          if (player.inHand && player.investedStack === inHandInvestedStacks[0]) {
            player.stackSize += (inHandInvestedStacks[0] - inHandInvestedStacks[1]);
            player.investedStack = inHandInvestedStacks[1];
          }
        })
      }


      //adds outstanding bets to pot. TODO take care of side bets
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

        if (Object.values(this.seatMap).filter(player => {
          return player !== "" && player.inHand && player.stackSize > 0;
        }).length <= 1) {
          //only one player is left who can act
          this.allIn = true;
          setTimeout(() => {
            this.emitAll(true);
          }, 1000);
          setTimeout(() => {
            this.board.push(this.deck.getNextCard());
            this.emitAll(true);
          }, 2000);
          setTimeout(() => {
            this.board.push(this.deck.getNextCard());
            this.emitAll(true);
          }, 3000);
          setTimeout(() => {
            this.nextStreet();
          }, 4000);
        } else {
          var advanced = false;
          this.action = this.buttonLocation;
          //finds the player who is going first on the flop
          while (!advanced) {
            this.action = (this.action + 1) % this.numPlayers;
            if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand && this.seatMap[this.action].stackSize > 0) {
              //sets lastRaiser so that when it gets back to this player, nextStreet() is called
              this.lastRaiser = this.action;
              advanced = true;
            }
          }
        }
        if (!this.allIn && !this.finished) {
          setTimeout(() => this.emitAll(), 500);
          setTimeout(() => this.timer = setInterval(this.timerLogic, 1000, this), 500);
        }


      } else if (this.board.length === 3 || this.board.length === 4) {
        //flop finish
        //deal turn
        this.board.push(this.deck.getNextCard());

        if (Object.values(this.seatMap).filter(player => {
          return player !== "" && player.inHand && player.stackSize > 0;
        }).length <= 1) {
          this.allIn = true;
          if (this.board.length === 4) {
            setTimeout(() => {
              this.emitAll(true);
            }, 1000);
            setTimeout(() => {
              this.board.push(this.deck.getNextCard());
              this.emitAll(true);
            }, 2000);
            setTimeout(() => {
              this.nextStreet();
            }, 3000);
          } else {
            setTimeout(() => {
              this.emitAll(true);
            }, 1000);
            setTimeout(() => {
              this.nextStreet();
            }, 2000);
          }
        } else {
          var advanced = false;
          var firstTime = true;
          this.action = this.buttonLocation;
          //finds the player who is going first on the turn
          while (!advanced) {
            this.action = (this.action + 1) % this.numPlayers;
            if (this.seatMap[this.action] !== "" && this.seatMap[this.action].inHand && this.seatMap[this.action].stackSize > 0) {
              //sets lastRaiser so that when it gets back to this player, nextStreet() is called
              this.lastRaiser = this.action;
              advanced = true;
            }
          }
          clearInterval(this.timer);
          if (!this.allIn && !this.finished) {
            setTimeout(() => this.emitAll(), 500);
            setTimeout(() => this.timer = setInterval(this.timerLogic, 1000, this), 500);
          }
        }


      } else if (this.board.length === 5) {
        //river finish
        //display both hands
        this.emitAll(true);
        var currentStrongestHandStrength = 0;
        var winners = [];
        playersInHandList.forEach(player => {
          const playerHandStrength = hand.getRanking(player.hand, this.board);
          if (playerHandStrength == currentStrongestHandStrength) {
            winners.push(player);
          } else if (playerHandStrength > currentStrongestHandStrength) {
            currentStrongestHandStrength = playerHandStrength;
            winners = [player];
          }
        })
        //finds the value of the final pot
        Object.values(this.seatMap).forEach(player => {
          if (player.investedStack > 0) {
            this.pot += player.investedStack;
            player.investedStack = 0;
          }
        })
        //todo: split so that not evenly divisible things as well as do multi-way pots eventually
        winners.forEach(player => {
          player.stackSize += Math.round(this.pot/winners.length);
        })
        this.pot = 0;
        const listOfLivePlayers = Object.values(this.seatMap).filter(player => {
          return player.stackSize > 0;
        })
        if (listOfLivePlayers.length === 1) {
          //someone has won the match
          this.finished = true;
          const winnerId = listOfLivePlayers[0].id;
          if (this.parentMatch !== null) {
            //should be true by default now
            this.parentMatch.games[this.id].winner = winnerId;
            const numRemainingMatches = Object.values(this.parentMatch.games).filter(game => {
              return game.winner === 'none';
            }).length;
            if (numRemainingMatches === 0) {
              this.parentMatch.end();
            }
          }
          this.emitAll(true);
        } else {
          setTimeout(() => {
            this.startHand();
          }, 2000);
          setTimeout(() => this.timer = setInterval(this.timerLogic, 1000, this), 2000);
        }
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
    var playerInHand = false;
    Object.values(this.seatMap).forEach(player => {
      if (player.id === playerId) {
        thisPlayerSeatNumber = player.seatNumber;
        playerInHand = player.inHand;
      }
    })
    return thisPlayerSeatNumber === this.action;
  }

  emitAll(all = false) {
    Object.values(this.seatMap).forEach(basePlayer => {
      const info = this.getGameState(basePlayer.id, all);
      this.io.to(this.userSocketMap[basePlayer.id]).emit("GAME STATE", info[0], info[1]);
    })
  }

  getPlayerSeatById(playerId) {
    var playerSeatNumber = 0;
    Object.values(this.seatMap).forEach((player, seatNumber) => {
      if (player.id === playerId) {
        playerSeatNumber =  seatNumber;
      }
    })
    return playerSeatNumber;
  }

  /**
   * Returns a String representing the game state as defined in wire-protocol.txt
   * @param  {String} playerId the UUID of the player
   * @return {String}          a representation of the game state for the SPECIFIC PLAYER as defined in wire-protocol.txt
   */
  getGameState(playerId, all = false) {
    const adaptedBoard = this.board.map(card => {
      return [card.rank, card.suit];
    });
    const potPlusRaises = this.pot + Object.values(this.seatMap).reduce(((accumulator, player) => {
      return accumulator + player.investedStack;
    }), 0);
    const gameInfo = {
      numPlayers: this.numPlayers,
      buttonLocation: this.buttonLocation,
      action: this.action,
      pot: this.pot,
      board: adaptedBoard,
      time: this.time,
      maxTime: this.maxTime,
      checkable: parseInt(this.currentTotalRaise) === parseInt(this.seatMap[this.getPlayerSeatById(playerId)].investedStack),
      minBet: 2 * this.currentTotalRaise - this.lastRaiseSize,
      maxBet: parseInt(this.seatMap[this.getPlayerSeatById(playerId)].investedStack) + parseInt(this.seatMap[this.getPlayerSeatById(playerId)].stackSize),
      bigBlindValue: this.bigBlindValue,
      currentTotalRaise: this.currentTotalRaise,
      potPlusRaises: potPlusRaises,
    };
    const allPlayerInfo = [];
    const adjustedPlayersList = Object.values(this.seatMap).map(secondaryPlayer => {
      var hand;
      if (!all) {
        if (secondaryPlayer.id === playerId) {
          if (secondaryPlayer.hand.length == 2) {
            hand = [[secondaryPlayer.hand[0].rank.toString(), secondaryPlayer.hand[0].suit], [secondaryPlayer.hand[1].rank.toString(), secondaryPlayer.hand[1].suit]];
          } else {
            hand = [["none", "none"], ["none", "none"]];
          }
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
