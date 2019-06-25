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
    this.maxTime = 30;
    this.userSocketMap = userSocketMap;
    this.animateNextStreet = false;
    this.animateWin = false;
    this.animateCtr = 1;
    this.io = io;
    this.finished = false;
    this.allIn = false;
    this.timer = null;
    for(var i = 0; i < numPlayers; i++) {
      this.seatMap[i] = "";
    };
  }


  timerLogic(obj) {
      if (obj.animateCtr > 0) {
        //waiting for animation to finish
        obj.animateCtr--;
      }else {
        if (obj.finished) {
          clearInterval(obj.timer);
          // console.log('in timer but this is finished');
          // const info = obj.getGameState(null, true);
          // Object.values(obj.seatMap).forEach(basePlayer => {
          //   // const allPlayerInfo = [];
          //
          //
          //   obj.io.to(obj.userSocketMap[basePlayer.id]).emit("GAME STATE", info[0], info[1]);
          // })
        } else {
          //just ticking waiting for player to act
          obj.time--;
          //logic for out of time

          obj.emitAll();
        }

      }

    // }


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
   * when this function was first called
   */
  startHand() {
    //deals players hands
    this.pot = 0;
    this.board = [];
    this.toEnd = false;
    this.lastRaiseSize = this.bigBlindValue;
    this.time = this.maxTime;
    Object.values(this.seatMap).forEach(player => {
      if (player !== "") {
        player.hand = [];
        player.hand.push(this.deck.getNextCard());
        player.hand.push(this.deck.getNextCard());
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
          player.investedInHand += player.stackSize;
          player.stackSize = 0;
        } else {
          player.investedStack += raiseDelta;
          player.investedInHand += raiseDelta;
          player.stackSize -= raiseDelta;
        }
        this.lastRaiser = this.action;
        this.lastRaiseSize = raiseDelta;
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
      clearInterval(this.timer);
      setTimeout(() => {
        this.startHand();
        this.timer = setInterval(this.timerLogic, 1000, this);
      }, 2000);

    } else {
      //makes sure animation happens in next clock tick - to change this so that there's no timing issues
      //resets variables for the next street
      const inHandInvestedStacks = [];
      Object.values(this.seatMap).forEach(player => {
        if (player.inHand) {
          inHandInvestedStacks.push(player.investedStack);
        }
      });
      console.log(inHandInvestedStacks);
      inHandInvestedStacks.sort(function(a, b){return b - a});
      console.log(inHandInvestedStacks);
      if (inHandInvestedStacks[0] !== inHandInvestedStacks[1]) {
        //someone shoved over, and should get their money back
        Object.values(this.seatMap).forEach(player => {
          if (player.inHand && player.investedStack === inHandInvestedStacks[0]) {
            player.stackSize += (inHandInvestedStacks[0] - inHandInvestedStacks[1]);
            player.investedStack = inHandInvestedStacks[1];
          }
        })
      }

      this.lastRaiseSize = 0;
      this.currentTotalRaise = 0;
      //adds outstanding bets to pot and
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
          return player.stackSize > 0;
        }).length <= 1) {
          //only one player is left who can act
          this.action = null;
          this.allIn = true;
          advanced = true;
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



      } else if (this.board.length === 3 || this.board.length === 4) {
        //flop finish
        //deal turn
        this.board.push(this.deck.getNextCard());

        if (Object.values(this.seatMap).filter(player => {
          return player.stackSize > 0;
        }).length <= 1) {
          this.action = null;
          this.allIn = true;
          advanced = true;
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
            this.timer = this.timer = setInterval(this.timerLogic, 1000, this);
          }, 1000);
        }

        this.allIn = false;
        this.pot = 0;
        this.animateWin = true;

        // winner.stackSize += this.pot;
      }
      clearInterval(this.timer);
      if (!this.allIn) {
        setTimeout(() => this.timer = setInterval(this.timerLogic, 1000, this), 1000);
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

  emitAll(all = false) {
    Object.values(this.seatMap).forEach(basePlayer => {
      const info = this.getGameState(basePlayer.id, all);
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
    const gameInfo = {
      numPlayers: this.numPlayers,
      buttonLocation: this.buttonLocation,
      action: this.action,
      pot: this.pot,
      board: adaptedBoard,
      time: this.time,
      maxTime: this.maxTime,
    };
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
