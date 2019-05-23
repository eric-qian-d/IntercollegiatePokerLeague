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
   * @param {Player} player   the player to be added
   * @param {Integer} position position of the player, where 0 is the small blind and n-1 is the button
   * maybe eliminate the position field in Player.js
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  function addPlayer(player, position) {

  }

  /**
   * Removes a player from the poker game
   * @param {Player} player   the player to be removed
   * @param {Integer} position position of the player, where 0 is the small blind and n-1 is the button
   * maybe eliminate the position field in Player.js
   * additionally, maybe eliminate either the player argument or position argument
   * @return {Boolean} true if the player was added successfuly and false otherwise
   */
  function removePlayer(player, position) {

  }

  //game logic
}
