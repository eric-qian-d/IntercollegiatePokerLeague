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
const playerStatusMap = {}; //maps from playerId to //CUSTOM LISTINGS, CUSTOM MATCH LOBBY, GAME
const playerSocketMap = {}; //maps from playerId to socket
const playerAvailable = {}; //maps from playerId to availability //AVAILABLE, CUSTOM MATCH OWNER, IN CUSTOM MATCH, IN QUEUE
//
const customMatchMap = {}; //maps from matchId to Match object
const gameMap = {}; //maps from gameId to Game object




/**
 * TO SPECCCC
 * @param {[type]} matchId    [description]
 * @param {[type]} name       [description]
 * @param {[type]} type       [description]
 * @param {[type]} numPlayers [description]
 */
function addCustomMatch(matchId, name, numPlayers, ownerId) {
  var newMatch = new Match(matchId, name, numPlayers, ownerId);
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
  }).filter(m => {
    return !m.inProgress;
  });
  return customMatches
}

function notifyCustomMatchLobby() {
  io.to("CUSTOM LISTINGS").emit("CUSTOM MATCHES", getCustomMatches());
}

//currently only works for heads up matches
function startMatch(matchId) {
  const match = customMatchMap[matchId];
  console.log(match);
  const team1 = match.team1;
  const team2 = match.team2;
  const games = match.games;
  if (team1.length === team2.length) {
    match.status = 'in progress';
    notifyCustomMatchLobby();
    for(var i = 0; i < team1.length; i++) {
      const newGameId = uuidv4();
      const newGame = new Game(newGameId, "", 2, 10, matchId, playerSocketMap, io, match);
      newGame.addPlayer(team1[i].id, 0, 10000, team1[i].firstName + ' ' + team1[i].lastName);
      newGame.addPlayer(team2[i].id, 1, 10000, team2[i].firstName + ' ' + team2[i].lastName);
      games[newGameId] = {
        team1Player : team1[i],
        team2Player : team2[i],
        gameId : newGameId,
        winner : "none"
      }
      gameMap[newGameId] = newGame;
      playerStatusMap[team1[i].id] = "GAME";
      playerStatusMap[team2[i].id] = "GAME";
      playerGameMap[team1[i].id] = newGameId;
      playerGameMap[team2[i].id] = newGameId;
      io.to(playerSocketMap[team1[i].id]).emit("GAME");
      io.to(playerSocketMap[team2[i].id]).emit("GAME");
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
  const game = gameMap[playerGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gamePlayerSocketMap = {}
  playerIds.forEach(playerId => {
    gamePlayerSocketMap[playerId] = playerSocketMap[playerId];
  })
  game.fold(playerId);
}

/**
 * Forwards the player's call action to the respective Game.
 * @param  {String} playerId the UUID of the player
 */
function call(playerId) {
  const game = gameMap[playerGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gamePlayerSocketMap = {}
  playerIds.forEach(playerId => {
    gamePlayerSocketMap[playerId] = playerSocketMap[playerId];
  })
  game.call(playerId);
}

/**
 * Forwards the player's raise action to the respective Game.
 * @param  {String} playerId    the UUID of the player
 * @param  {Integer} finalAmount the final amount that the player is raising to
 */
function raise(playerId, finalAmount) {//maybe should make it raiseAmount rather than finalAmount
  const game = gameMap[playerGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gamePlayerSocketMap = {}
  playerIds.forEach(playerId => {
    gamePlayerSocketMap[playerId] = playerSocketMap[playerId];
  })
  game.raise(playerId, finalAmount);
}



port = process.env.PORT || 8081;
var server = http.createServer(app);
var io = socketIO(server);

io.use(function(socket, next) {
    session.session(socket.request, socket.request.res, next);
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
  //need to implement logic to direct people to home/login if not logged in
  console.log(socket.request.isAuthenticated());
  if(socket.request.isAuthenticated()) {
    const userId = socket.request.user.id;
    playerSocketMap[userId] = socket.id;
    console.log(playerSocketMap)

    if (!playerStatusMap.hasOwnProperty(userId)) {
      //client joining for the first time
      //TODO: also send out a ping about what the user should see, just in case
      playerAvailable[userId] = "AVAILABLE";
      playerStatusMap[userId] = "CUSTOM LISTINGS";
      socket.join("CUSTOM LISTINGS");
    } else if (playerStatusMap[userId] === "CUSTOM LISTINGS") {
      //client refreshed while in custom listings
      socket.join("CUSTOM LISTINGS");
    } else if (playerStatusMap[userId] === "CUSTOM MATCH LOBBY") {
      //client refreshed while in a match lobby
      socket.join(playerMatchMap[userId]);
    }
  }
  //Sends user the correct page when they refresh
  socket.on("WHICH PAGE", async () => {
    const state = playerStatusMap[socket.request.user.id];
    const userId = socket.request.user.id;
    if (state === undefined || state === "CUSTOM LISTINGS") {
      io.to(playerSocketMap[userId]).emit("CUSTOM LISTINGS");
    } else if (state === "CUSTOM MATCH LOBBY") {
      io.to(playerSocketMap[userId]).emit("CUSTOM MATCH LOBBY")
    } else if (state === "GAME") {
      io.to(playerSocketMap[userId]).emit("GAME");
    }
  });

  //Custom Match Lobby Logic
  socket.on("GET CUSTOM MATCHES", async () => {
    const userId = socket.request.user.id;
    playerStatusMap[userId] = "CUSTOM LISTINGS";
    socket.join("CUSTOM LISTINGS");
    io.to(playerSocketMap[userId]).emit("CUSTOM MATCHES", getCustomMatches());
  });

  //a user cannot be queued in anything else before they request to create a custom game
  socket.on("NEW CUSTOM MATCH", async (name, numPlayers) => {
    const userId = socket.request.user.id;
    if (playerAvailable[userId] !== "AVAILABLE") {
      io.to(playerSocketMap[userId]).emit("CREATE FAILED", playerAvailable[userId]);
    } else {
      playerAvailable[userId] = "CUSTOM MATCH OWNER";
      const newMatchId = uuidv4();
      addCustomMatch(newMatchId, name, numPlayers, userId);
      playerStatusMap[userId] = "CUSTOM MATCH LOBBY";
      playerMatchMap[userId] = newMatchId;
      socket.emit("CUSTOM MATCH LOBBY");
    }
  });

  //a user cannot be queued in anything else before they request to create a custom game
  socket.on("JOIN CUSTOM MATCH", async (matchId) => {
    const userId = socket.request.user.id;
    if (playerAvailable[userId] !== "AVAILABLE") {
      io.to(playerSocketMap[userId]).emit("JOIN FAILED", playerAvailable[userId]);
    } else {
      playerStatusMap[userId] = "CUSTOM MATCH LOBBY";
      playerMatchMap[userId] = matchId;
      const match = customMatchMap[matchId];
      match.listeners[userId] = true;
      io.to(playerSocketMap[userId]).emit("CUSTOM MATCH LOBBY");
    }
  });


  //Custom Match Lobby Logic
  socket.on("IS OWNER", async() => {
    console.log("is owner req");
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    io.to(playerSocketMap[userId]).emit("IS OWNER", match.ownerId === userId);
  })
  socket.on("JOIN TEAM 1", async () => {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    match.team1 = match.team1.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    match.team2 = match.team2.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    match.team1.push(socket.request.user);
    const team1names = match.team1.map(user => {
      return (user.firstName + ' ' + user.lastName);
    });
    const team2names = match.team2.map(user => {
      return (user.firstName + ' ' + user.lastName);
    })
    console.log(team1names);
    console.log(team2names);
    Object.keys(match.listeners).forEach(playerId => {
      io.to(playerSocketMap[playerId]).emit("TEAM 1", team1names, false);
      io.to(playerSocketMap[playerId]).emit("TEAM 2", team2names, false);
    })
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 1", team1names, true);
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 2", team2names, true);
  });

  socket.on("JOIN TEAM 2", async () => {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    match.team1 = match.team1.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    match.team2 = match.team2.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    match.team2.push(socket.request.user);
    const team1names = match.team1.map(user => {
      return (user.firstName + ' ' + user.lastName);
    });
    const team2names = match.team2.map(user => {
      return (user.firstName + ' ' + user.lastName);
    })
    Object.keys(match.listeners).forEach(playerId => {
      io.to(playerSocketMap[playerId]).emit("TEAM 1", team1names, false);
      io.to(playerSocketMap[playerId]).emit("TEAM 2", team2names, false);
    })
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 1", team1names, true);
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 2", team2names, true);
  });

  socket.on("GET TEAM 1", async () => {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    const team1names = match.team1.map(user => {
      return (user.firstName + ' ' + user.lastName);
    });
    io.to(playerSocketMap[userId]).emit("TEAM 1", team1names);
  });
  socket.on("GET TEAM 2", async () => {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    const team2names = match.team2.map(user => {
      return (user.firstName + ' ' + user.lastName);
    })
    io.to(playerSocketMap[userId]).emit("TEAM 2", team2names);
  });
  socket.on("START MATCH", async () => {
    console.log('start match request');
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    if (match.ownerId === userId) {
      startMatch(matchId);
    }
  })
  socket.on("RETURN TO LISTINGS", async () => {
    const userId = socket.request.user.id;
    const userEmail = socket.request.user.email;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    match.team1 = match.team1.filter(id => {return !(id === userId)});
    match.team2 = match.team2.filter(id => {return !(id === userId)});
    delete match.listeners[userId];
    Object.keys(match.listeners).forEach(playerId => {
      io.to(playerSocketMap[playerId]).emit("TEAM 1", match.team1, false);
      io.to(playerSocketMap[playerId]).emit("TEAM 2", match.team2, false);
    })
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 1", match.team1, true);
    io.to(playerSocketMap[match.ownerId]).emit("TEAM 2", match.team2, true);
    playerAvailable[userId] = "AVAILABLE";
    playerStatusMap[userId] = "CUSTOM LISTINGS";
    socket.join("CUSTOM LISTINGS");
    io.to(playerSocketMap[userId]).emit("CUSTOM LISTINGS");
  });

  socket.on("GET GAME STATE", async function() {
    const userId = socket.request.user.id;
    const game = gameMap[playerGameMap[userId]];
    const gameState = game.getGameState(userId);
    io.to(playerSocketMap[userId]).emit("GAME STATE", gameState[0], gameState[1]);
  })

  socket.on("JOIN LOBBY", async function(seatNumber) {
    addPlayer(socket.id, "1234");//how to get player ID?
  });

  socket.on("JOIN GAME", async function(gameId) {
    joinGame(socket.request.user.id, gameId);//how to get player ID?
  });
  socket.on("SEAT", async function(seatNumber) {
    pickSeat(socket.request.user.id, seatNumber);
  })
  socket.on("FOLD", async function() {
    fold(socket.request.user.id);
  });
  socket.on("CALL", async function() {
    console.log("received a call action");
    call(socket.request.user.id);
  });
  socket.on("RAISE", async function(finalAmount) {
    raise(socket.request.user.id, finalAmount);
  });
  socket.on('GO TO LOBBY', async function() {
    const userId = socket.request.user.id;
    playerStatusMap[userId] = "CUSTOM MATCH LOBBY";
    // const match = customMatchMap[matchId];
    io.to(playerSocketMap[userId]).emit("CUSTOM MATCH LOBBY");
  });

  socket.on('GET MATCH STATUS', async function () {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    io.to(playerSocketMap[userId]).emit('MATCH STATUS', match.status);
  })

  socket.on('MATCH RESULTS', async function() {
    const userId = socket.request.user.id;
    const matchId = playerMatchMap[userId];
    const match = customMatchMap[matchId];
    const results = [];
    const team1 = match.team1;
    const team2 = match.team2;
    Object.values(match.games).forEach((game, gameNumber) => {
      if (game.winner === 'none') {
        const gameResults = [];
        gameResults.push([team1[gameNumber].firstName + ' ' + team1[gameNumber].lastName, 'in progress']);
        gameResults.push([team2[gameNumber].firstName + ' ' + team2[gameNumber].lastName, 'in progress']);
        results.push(gameResults);
      } else {
        if (game.winner === game.team1Player.id) {
          const gameResults = [];
          gameResults.push([team1[gameNumber].firstName + ' ' + team1[gameNumber].lastName, 'won']);
          gameResults.push([team2[gameNumber].firstName + ' ' + team2[gameNumber].lastName, 'lost']);
          results.push(gameResults);
        } else {
          const gameResults = [];
          gameResults.push([team1[gameNumber].firstName + ' ' + team1[gameNumber].lastName, 'lost']);
          gameResults.push([team2[gameNumber].firstName + ' ' + team2[gameNumber].lastName, 'won']);
          results.push(gameResults);
        }
      }
    })
    console.log('from match results');
    console.log(results);
    io.to(playerSocketMap[userId]).emit('MATCH RESULTS', results);
  })



  socket.on("EXIT", async function() {
    leaveGame(socket.request.user.id);
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
