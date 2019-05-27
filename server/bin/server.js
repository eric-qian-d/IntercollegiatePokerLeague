var http = require("http");
var socketIO = require("socket.io");
var game = require("../common/game-logic/game");
var gameType = require("../common/game-logic/gameType");



var socketMap = {}; //maps from socketId to playerId
var playerGameMap = {}; //maps from playerId to gameId
var gameMap = {}; //maps from gameId to Game



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
 *
 */
function joinGame(playerId, gameId) {
  playerGameMap[playerId] = gameId;

}

/**
 * Selects a seat at the player's game
 * @param  {String} playerId the UUID of the player
 * @param  {Integer} seatNumber the seatNumber the player is trying to sit at
 * @return {Boolean}         true if the game was joined successfully and false otherwise
 */
function pickSeat(playerId, seatNumber) {
  var game = gameMap[playerGameMap[playerId]];
  game.addPlayer(playerId, seatNumber);
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



module.exports = {
	start: app => {
		port = process.env.PORT || 8081;
		var server = http.createServer(app);
		var io = socketIO(server);

		io.on("connection", function(socket) {
		  console.log("New client connected");

		  socket.on("JOIN LOBBY", async function(seatNumber) {
		    addPlayer(socket.id, "1234");//how to get player ID?
		  });
		  socket.on("JOIN GAME", async function(gameId) {
		    joinGame(socketMap[socket.id], gameId);//how to get player ID?
		  });
		  socket.on("SEAT", async function(seatNumber) {
		    pickSeat(socketMap[socket.id], seatNumber);
		  })
		  socket.on("FOLD", async function() {
		    fold(socketMap[socket.id]);
		  });
		  socket.on("CALL", async function() {
		    console.log("received a call action");
		    call(socketMap[socket.id]);
		  });
		  socket.on("RAISE", async function(finalAmount) {
		    raise(socketMap[socket.id], finalAmount);
		  });
		  socket.on("EXIT", async function() {
		    leaveGame(socketMap[socket.id]);
		    //logic for handling ranking
		  });
		})






		server.listen(port, () => {
			console.log('Express server listening on port ' + server.address().port);
		});
	}
}


// const db = require('../routes/db.js');
//
// // console.log(db);
// var test = async () => {
// 	const res = await db.query('SELECT * FROM users');
// 	for(var i = 0; i < res.rows.length; i++) {
// 		console.log(res.rows[i]);
// 	}
// }
//
// test();
