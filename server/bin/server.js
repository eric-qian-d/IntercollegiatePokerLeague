var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
const uuidv4 = require('uuid/v4');
const passportSocket = require("passport.socketio");
const cookieParser = require('cookie-parser');
var Game = require("../common/game-logic/game");
var gameType = require("../common/game-logic/gameType");
var Match = require("../common/match-logic/match");
var MatchSocket = require("../common/match-logic/match-socket");
var app = require("../app");
var session = require("../config/session");

const playerGameMap = {}; //maps from playerId to gameId
const playerMatchMap = {}; //maps from playerId to matchId
const playerStatusMap = {};

const customMatchMap = {}; //maps from matchId to Match object
const gameMap = {}; //maps from gameId to Game object



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
 * TO SPECCCC
 * @param {[type]} matchId    [description]
 * @param {[type]} name       [description]
 * @param {[type]} type       [description]
 * @param {[type]} numPlayers [description]
 */
function addCustomMatch(matchId, name, numPlayers) {
  var newMatch = new Match(matchId, name, numPlayers);
  customMatchMap[matchId] = newMatch;
  notifyCustomMatchLobby();
}

function getCustomMatches() {
  var customMatches = Object.values(customMatchMap).map(m => {
    return (
      {
        id : m.id,
        name : m.name,
        numPlayers : m.numPlayers,
      }
    )
  });
  return customMatches
}

function notifyCustomMatchLobby() {
  io.to("CUSTOM LISTINGS").emit("CUSTOM MATCHES", getCustomMatches());
}

//currently only works for heads up matches
function startMatch(matchId) {
  const match = customMatchMap[matchId];
  const team1 = match.team1;
  const team2 = match.team2;
  const games = match.games;
  if (team1.length === team2.length) {
    for(var i = 0; i < team1.length; i++) {
      const newGameId = uuidv4();
      const newGame = new Game(newGameId, "", 2, matchId);
      newGame.addPlayer(team1[i], 0);
      newGame.addPlayer(team2[i], 1);
      games[i] = {
        team1Player : team1[i],
        team2Player : team2[i],
        gameId : newGameId,
        winner : "none"
      }
      gameMap[newGameId] = newGame;
      io.to(team1[i]).emit("GAME");
      io.to(team2[i]).emit("GAME");
    }
  }

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



port = process.env.PORT || 8081;
var server = http.createServer(app);
var io = socketIO(server);

io.use(function(socket, next) {
    session.session(socket.request, socket.request.res, next);
    console.log("socket request start");
    console.log(socket.request);
    console.log("socket request end");
});

io.use(passportSocket.authorize({
  cookieParser: cookieParser,
  store: session.MemoryStore,
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: 24*60*60*1000
  }
}));

io.on("connection", function(socket) {
  console.log("New client connected");

  //HU Lobby Logic
  socket.on("GET CUSTOM MATCHES", async () => {
    socket.join("CUSTOM LISTINGS");
    socket.emit("CUSTOM MATCHES", getCustomMatches());
  });

  socket.on("NEW CUSTOM MATCH", async (name, numPlayers) => {
    console.log(socket.request);
    addCustomMatch(name, name, numPlayers); //toChange with UUID

  });
  socket.on("JOIN CUSTOM MATCH", async (matchId) => {
    socketToRoom[socket.id] = matchId;
    socket.join(matchId);
    socket.emit("CUSTOM MATCH LOBBY");
  });


  //Custom Match Lobby Logic
  //IMPORTANT: TO MAKE THIS ALL ASSOCIATED WITH COOKIES
  socket.on("JOIN TEAM 1", async () => {
    const matchId = socketToRoom[socket.id];
    const match = customMatchMap[matchId];
    match.team1 = match.team1.filter(id => {return !(id === socket.id)});
    match.team2 = match.team2.filter(id => {return !(id === socket.id)});
    match.team1.push(socket.id);
    io.to(matchId).emit("TEAM 1", match.team1);
    io.to(matchId).emit("TEAM 2", match.team2);
  });
  socket.on("JOIN TEAM 2", async () => {
    const matchId = socketToRoom[socket.id];
    const match = customMatchMap[matchId];
    match.team1 = match.team1.filter(id => {return !(id === socket.id)});
    match.team2 = match.team2.filter(id => {return !(id === socket.id)});
    match.team2.push(socket.id);
    io.to(matchId).emit("TEAM 1", match.team1);
    io.to(matchId).emit("TEAM 2", match.team2);
  });
  socket.on("GET TEAM 1", async () => {
    const matchId = socketToRoom[socket.id];
    io.to(socket.id).emit("TEAM 1", customMatchMap[matchId].team1);
  });
  socket.on("GET TEAM 2", async () => {
    const matchId = socketToRoom[socket.id];
    io.to(socket.id).emit("TEAM 2", customMatchMap[matchId].team2);
  });
  socket.on("START MATCH", async () => {
    const matchId = socketToRoom[socket.id];
    startMatch(matchId);
    // console.log(gameMap);
    // console.log(customMatchMap);
  })



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

module.exports = {
	start: () => {
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
