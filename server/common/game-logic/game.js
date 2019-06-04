var deck = require("./deck");
var card = require("./card");
var player = require("./player");
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
    for(var i = 0; i < numPlayers; i++) {
      this.seatMap[i] = "";
    };
    //create other datatypes as necessary for type of game
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

  }

  /**
   * Logic for having the player call the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId the UUID of the player
   * @return {Boolean}         True if the call is legal (correct turn) and went through, False otherwise
   */
  call(playerId, playerSocketMap) {
    if (isPlayersTurn(playerId)) {
      const player = Object.keys.(this.seatMap).filter(player => {
        return player.id === playerId;
      });
      const needToCall = this.currentTotalRaise - player.investedStack;
      if (player.stackSize - (needToCall) < 0) {
        player.investedStack += player.stackSize;
        this.stackSize = 0;
      } else {
        player.investedStack += needToCall;
        this.stackSize -= needToCall;
      }
      var advanced = false;
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (seatMap[this.action] !== "" && seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      if (this.action === this.lastRaiser) {
        nextStreet();
      }
    }

  }

  /**
   * Logic for having the player raise the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId    the UUID of the player
   * @param  {Integer} finalAmount the final amount to be raised to
   * @return {Boolean}             True if the raise is legal (correct turn and valid raise size) and False otherwise.
   */
  raise(playerId, finalAmount, playerSocketMap) {
    //make sure raise is legal
    if (isPlayersTurn(playerId)) {
      const player = Object.keys.(this.seatMap).filter(player => {
        return player.id === playerId;
      });
      const raiseDelta = this.finalAmount - player.investedStack;
      if (raiseDelta > stackSize || raiseDelta > this.lastRaiseSize) {
        //legal raise
        if (raiseDelta > stackSize) {
          player.investedStack += player.stackSize;
          this.stackSize = 0;
        } else {//legal raise
          player.investedStack += raiseDelta;
          this.stackSize -= raiseDelta;
        }
        var advanced = false;
        while (!advanced) {
          this.action = (this.action + 1) % this.numPlayers;
          if (seatMap[this.action] !== "" && seatMap[this.action].inHand) {
            advanced = true;
          }
        }
        if (this.action === this.lastRaiser) {
          nextStreet();
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
  fold(playerId, playerSocketMap) {
    if (isPlayersTurn(playerId)) {
      const player = Object.keys.(this.seatMap).filter(player => {
        return player.id === playerId;
      });
      this.inHand = false;
      var advanced = false;
      while (!advanced) {
        this.action = (this.action + 1) % this.numPlayers;
        if (seatMap[this.action] !== "" && seatMap[this.action].inHand) {
          advanced = true;
        }
      }
      if (this.action === this.lastRaiser) {
        nextStreet();
      }
    }

  }

  nextStreet() {

  }


  /**
   * Determines whether or not it's the player's turn
   * @param  {String}  playerId the UUID of the player
   * @return {Boolean}          True if it's the player's turn and False otherwise
   */
  isPlayersTurn(playerId) {
    return this.seatMap[playerId].seatNumber === this.action;
  }

  /**
   * Returns a String representing the game state as defined in wire-protocol.txt
   * @param  {String} playerId the UUID of the player
   * @return {String}          a representation of the game state for the SPECIFIC PLAYER as defined in wire-protocol.txt
   */
  getGameState(playerId){

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
