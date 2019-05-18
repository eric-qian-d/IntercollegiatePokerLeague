var socketIO = require("socket.io");
var game = require("../common/game");
var gameType = require("../common/gameType");

var socketMap = {};
var playerGameMap = {};
var gameMap = {};


/**
 * Map a socket to a playerId
 * @param {[type]} socket [description]
 * @param {String} id the UUID of the player
 */
function addPlayer(socket, playerId) {
  socketMap[socket] = playerId;
}

/**
 * Adds a new game to the lobby
 * @param {String} gameId the ID of the new game
 * @param {gameType} type   the type of the game, as defined in the enum gameType.js
 */
function addGame(gameId, type) {

}

/**
 * Joins an existing game
 * @param  {[type]} playerId [description]
 * @param  {[type]} gameId   [description]
 * @return {[type]}          [description]
 */
function joinGame(playerId, gameId) {
  playerGameMap[playerId] = gameId;
}

function leaveGame(playerId) {

}

function fold(playerId) {

}

function call(playerId) {

}

function raise(playerId, finalAmount) {//maybe should make it raiseAmount rather than finalAmount

}
