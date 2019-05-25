var deck = require("deck");
var card = require("card");
var player = require("player");
var gameType = require("gameType");
var hand = require("hand");

class Game { // maybe rename this to be Table
  /**
   * Creates a new poker game
   * @param {String} gameId UUID of the game
   * @param {gameType} type   type of game
   */
  constructor(gameId, type) {
    this.id = gameId;
    this.type = type;
    //create other datatypes as necessary for type of game
  }

  /**
   * Adds a player to the poker game
   * @param {String} playerId   the player to be added
   * @param {Integer} seatNumber seat position of the player
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  function addPlayer(playerId, seatNumber) {

  }

  /**
   * Removes a player from the poker game
   * @param {String} playerId   the player to be removed
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  function removePlayer(playerId) {

  }

  //game logic

  /**
   * Begins new hand. Moves the button and deals cards to everyone that was present at the Table
   * when this function was first called
   */
  function startHand() {

  }

  /**
   * Executes logic for a player move
   * @param  {String} playerId the player who is acting
   * @param  {Action} action the player's action
   */
  function act(player, action) {

  }


}
