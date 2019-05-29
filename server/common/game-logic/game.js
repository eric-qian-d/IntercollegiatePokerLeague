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
  constructor(gameId, type, numPlayers, parentMatchId) {
    this.id = gameId;
    this.type = type;
    this.numPlayers = numPlayers;
    this.parentMatchId = parentMatchId;
    this.seatMap = {};

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
  addPlayer(playerId, seatNumber) {
    if (seatNumber < this.numPlayers && (this.seatMap[seatNumber] === "")) {
      this.seatMap[seatNumber] = playerId;
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
  call(playerId) {

  }

  /**
   * Logic for having the player raise the previous bet. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId    the UUID of the player
   * @param  {Integer} finalAmount the final amount to be raised to
   * @return {Boolean}             True if the raise is legal (correct turn and valid raise size) and False otherwise.
   */
  raise(playerId, finalAmount) {

  }

  /**
   * Logic for having the player fold. If the player is requesting this when it is not his/her turn, nothing happens
   * @param  {String} playerId the UUID of the player
   * @return {Boolean}         True if the fold is legal (correct turn) and went through, False otherwise
   */
  fold(playerId) {

  }


  /**
   * Determines whether or not it's the player's turn
   * @param  {String}  playerId the UUID of the player
   * @return {Boolean}          True if it's the player's turn and False otherwise
   */
  isPlayersTurn(playerId) {

  }

  /**
   * Returns a String representing the game state as defined in wire-protocol.txt
   * @param  {String} playerId the UUID of the player
   * @return {String}          a representation of the game state for the SPECIFIC PLAYER as defined in wire-protocol.txt
   */
  getGameState(playerId){

  }


}
