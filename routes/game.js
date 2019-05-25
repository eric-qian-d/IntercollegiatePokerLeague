var socketIO = require("socket.io");
var game = require("../common/game");
var gameType = require("../common/gameType");
var io = socketIO(server); // fix this

var socketMap = {}; //maps from socketId to playerId
var playerGameMap = {}; //maps from playerId to gameId
var gameMap = {}; //maps from gameId to Game



io.on("connection", function(socket) {
  socket.on("FOLD", async function() {
    fold(socketMap.get(socket.id));
  });
  socket.on("CALL", async function() {
    call(socketMap.get(socket.id));
  });
  socket.on("RAISE"), async function(finalAmount) {
    raise(socketMap.get(socket.id), finalAmount);
  }
  socket.on("EXIT"), async function() {
    leaveGame(socketMap.get(socket.id));
    //logic for handling ranking
  }
})



/**
 * Map a socket to a playerId
 * @param {[type]} socket [description]
 * @param {String} playerId the UUID of the player
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
