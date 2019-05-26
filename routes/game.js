var socketIO = require("socket.io");
var game = require("../common/game");
var gameType = require("../common/gameType");
var io = socketIO(server); // fix this

var socketMap = {}; //maps from socketId to playerId
var playerGameMap = {}; //maps from playerId to gameId
var gameMap = {}; //maps from gameId to Game


/**
 * Routes for handling socket connections
 * @param  {Socket} socket Default parameter of Socket.io
 */
io.on("connection", function(socket) {
  socket.on("FOLD", async function() {
    fold(socketMap.get(socket.id));
  });
  socket.on("CALL", async function() {
    call(socketMap.get(socket.id));
  });
  socket.on("RAISE", async function(finalAmount) {
    raise(socketMap.get(socket.id), finalAmount);
  });
  socket.on("EXIT", async function() {
    leaveGame(socketMap.get(socket.id));
    //logic for handling ranking
  });
})



/**
 * Map a socket to a playerId
 * @param {String} socketId the UUID of the player's socket
 * @param {String} playerId the UUID of the player
 */
function addPlayer(socketId, playerId) {
  socketMap[socketId] = playerId;
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
 * @param  {String} playerId the UUID of the player
 * @param  {String} gameId   the UUID of the game that the player is joining
 * @return {Boolean}         true if the game was joined successfully and false otherwise
 */
function joinGame(playerId, gameId) {
  playerGameMap[playerId] = gameId;
  var game = gameMap[playerGameMap[playerId]];
  game.addPlayer(playerId); //TODO: add seat number
}

/**
 * Has the player leave the game
 * @param  {String} playerId the UUID of the player
 * @return {Boolean}         true if the game was exited successfully and false otherwise
 */
function leaveGame(playerId) {
  var game = gameMap[playerGameMap[playerId]];
  game.removePlayer(playerId);
}

/**
 * Forwards the player's fold action to the respective Game.
 * @param  {String} playerId the UUID of the player
 */
function fold(playerId) {
  var game = gameMap[playerGameMap[playerId]];
  game.fold(playerId);
}

/**
 * Forwards the player's call action to the respective Game.
 * @param  {String} playerId the UUID of the player
 */
function call(playerId) {
  var game = gameMap[playerGameMap[playerId]];
  game.call(playerId);
}

/**
 * Forwards the player's raise action to the respective Game.
 * @param  {String} playerId    the UUID of the player
 * @param  {Integer} finalAmount the final amount that the player is raising to
 */
function raise(playerId, finalAmount) {//maybe should make it raiseAmount rather than finalAmount
  var game = gameMap[playerGameMap[playerId]];
  game.raise(playerId, finalAmount);
}
