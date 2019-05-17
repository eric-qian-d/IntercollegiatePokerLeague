var socketIO = require("socket.io");
var game = require("../common/game");

var socketMap = {};
var playerGameMap = {};
var gameMap = {};



function addPlayer(socket, id) {
  socketMap[socket] = id;
}

function addGame(gameId, type) {

}

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
