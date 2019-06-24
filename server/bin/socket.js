var socketIO = require('socket.io');
const passportSocket = require('passport.socketio');
const uuidv4 = require('uuid/v4');

const cookieParser = require('cookie-parser');
var Game = require('../common/game-logic/game');
var gameType = require('../common/game-logic/gameType');
var Match = require('../common/match-logic/match');

var session = require('../config/session');
const states = require('../common/states');
const constants = require('../common/constants');

const userGameMap = states.userGameMap; //maps from playerId to gameId
const userMatchMap = states.userMatchMap; //maps from playerId to matchId
const userLocation = states.userLocation; //maps from playerId to //CUSTOM LISTINGS, CUSTOM MATCH LOBBY, GAME
const userSocketMap = states.userSocketMap; //maps from playerId to socket
const userStatus = states.userStatus; //maps from playerId to availability //AVAILABLE, CUSTOM MATCH OWNER, IN CUSTOM MATCH, IN QUEUE, IN GAME
const matchMap = states.matchMap; //maps from matchId to Match object
const gameMap = states.gameMap; //maps from gameId to Game object

function addCustomMatch(matchId, name, numPlayers, ownerId, ownerName) {
  const newMatch = new Match(matchId, name, numPlayers, ownerId, ownerName, io, 'custom');
  matchMap[matchId] = newMatch;
  notifyCustomMatchLobby();
}

function getCustomMatches() {
  var customMatches = Object.values(matchMap)
  .filter(m => {
    return m.type === 'custom' && m.status === constants.matchStates.CREATION;
  })
  .map(m => {
    return (
      {
        id : m.id,
        name : m.name,
        numPlayers : m.numPlayers,
        ownerName : m.ownerName,
      }
    )
  })
  return customMatches
}

function notifyCustomMatchLobby() {
  io.to('CUSTOM LISTINGS').emit('CUSTOM MATCHES', getCustomMatches());
}


/**
 * Has the player leave the game
 * @param  {String} playerId the UUID of the player
 * @return {Boolean}         true if the game was exited successfully and false otherwise
 */
function leaveGame(playerId) {
  var game = gameMap[userGameMap[playerId]];
  game.removePlayer(playerId);
}

/**
 * Forwards the player's fold action to the respective Game.
 * @param  {String} playerId the UUID of the player
 */
function fold(playerId) {
  const game = gameMap[userGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gameuserSocketMap = {}
  playerIds.forEach(playerId => {
    gameuserSocketMap[playerId] = userSocketMap[playerId];
  })
  game.fold(playerId);
}

/**
 * Forwards the player's call action to the respective Game.
 * @param  {String} playerId the UUID of the player
 */
function call(playerId) {
  const game = gameMap[userGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gameuserSocketMap = {}
  playerIds.forEach(playerId => {
    gameuserSocketMap[playerId] = userSocketMap[playerId];
  })
  game.call(playerId);
}

/**
 * Forwards the player's raise action to the respective Game.
 * @param  {String} playerId    the UUID of the player
 * @param  {Integer} finalAmount the final amount that the player is raising to
 */
function raise(playerId, finalAmount) {//maybe should make it raiseAmount rather than finalAmount
  const game = gameMap[userGameMap[playerId]];
  const playerIds = game.getPlayerIds();
  const gameuserSocketMap = {}
  playerIds.forEach(playerId => {
    gameuserSocketMap[playerId] = userSocketMap[playerId];
  })
  game.raise(playerId, finalAmount);
}

var io;

module.exports = {
  //separated from server for modularity
  init: (server) => {
    io = socketIO(server);
    io.use(function(socket, next) {
        session.session(socket.request, socket.request.res, next);
    });

    io.use(passportSocket.authorize({
      cookieParser: cookieParser,
      store: session.MemoryStore,
      secret: 'tomakesecurelater',
      resave: false,
      saveUninitialized: true,
      cookie: {
          expires: 24*60*60*1000
      },
    }));

    io.on('connection', function(socket) {
      //need to implement logic to direct people to home/login if not logged in
      if(socket.request.isAuthenticated()) {
        //associate user with a socket
        const userId = socket.request.user.id;
        userSocketMap[userId] = socket.id;

        if (!userLocation.hasOwnProperty(userId)) {
          //client joining for the first time
          //TODO: also send out a ping about what the user should see, just in case
          userStatus[userId] = constants.userStatus.AVAILABLE;
          userLocation[userId] = constants.userLocation.CUSTOM_LISTINGS;
          socket.join('CUSTOM LISTINGS');
        } else if (userLocation[userId] === 'CUSTOM LISTINGS') {
          //client refreshed while in custom listings
          socket.join('CUSTOM LISTINGS');
        } else if (userLocation[userId] === 'CUSTOM MATCH LOBBY') {
          //client refreshed while in a match lobby
          socket.join(userMatchMap[userId]);
        }
      }
      //Sends user the correct page when they refresh
      socket.on('WHICH PAGE', async () => {
        const state = userLocation[socket.request.user.id];
        const userId = socket.request.user.id;
        if (state === undefined || state === constants.userLocation.CUSTOM_LISTINGS || state === constants.userLocation.OTHER) {
          io.to(userSocketMap[userId]).emit('PAGE: CUSTOM LISTINGS');
        } else if (state === constants.userLocation.CUSTOM_MATCH_LOBBY) {
          io.to(userSocketMap[userId]).emit('PAGE: CUSTOM MATCH LOBBY')
        } else if (state === constants.userLocation.GAME) {
          io.to(userSocketMap[userId]).emit('PAGE: GAME');
        } else if (state === constants.userLocation.IN_QUEUE) {
          io.to(userSocketMap[userId]).emit('PAGE: IN QUEUE');
        } else if (state === constants.userLocation.MATCH_CREATION) {
          io.to(userSocketMap[userId]).emit('PAGE: MATCH CREATION PAGE');
        }
      });

      //Custom Match Lobby Logic
      socket.on('GET CUSTOM MATCHES', async () => {
        const userId = socket.request.user.id;
        userLocation[userId] = constants.userLocation.CUSTOM_LISTINGS;
        socket.join('CUSTOM LISTINGS');
        io.to(userSocketMap[userId]).emit('CUSTOM MATCHES', getCustomMatches());
      });

      //a user cannot be queued in anything else before they request to create a custom game
      socket.on('NEW CUSTOM MATCH', async (name, numPlayers) => {
        const userId = socket.request.user.id;
        const userName = socket.request.user.firstName + ' ' + socket.request.user.lastName;
        if (userStatus[userId] !== constants.userStatus.AVAILABLE) {
          io.to(userSocketMap[userId]).emit('CREATE FAILED', userStatus[userId]);
        } else {
          userStatus[userId] = constants.userStatus.CUSTOM_MATCH_OWNER;
          const newMatchId = uuidv4();
          addCustomMatch(newMatchId, name, numPlayers, userId, userName);
          userLocation[userId] = constants.userLocation.CUSTOM_MATCH_LOBBY;
          userMatchMap[userId] = newMatchId;
          socket.emit('PAGE: CUSTOM MATCH LOBBY');
        }
      });

      //a user cannot be queued in anything else before they request to create a custom game
      socket.on('JOIN CUSTOM MATCH', async (matchId) => {
        const userId = socket.request.user.id;
        if (userStatus[userId] !== constants.userStatus.AVAILABLE) {
          io.to(userSocketMap[userId]).emit('JOIN FAILED', userStatus[userId]);
        } else {
          userLocation[userId] = constants.userLocation.CUSTOM_MATCH_LOBBY;
          userMatchMap[userId] = matchId;
          const match = matchMap[matchId];
          match.listeners[userId] = true;
          io.to(userSocketMap[userId]).emit('PAGE: CUSTOM MATCH LOBBY');
        }
      });

      socket.on('MAKE NEW HU MATCH REQ', async() => {
        console.log('got new hu req');
        const userId = socket.request.user.id;
        if (userStatus[userId] !== constants.userStatus.AVAILABLE) {
          io.to(userSocketMap[userId]).emit('CREATE FAILED', userStatus[userId]);
        } else {
          userLocation[userId] = constants.userStatus.MATCH_CREATION;
          console.log('success');
          io.to(userSocketMap[userId]).emit('PAGE: MATCH CREATION PAGE');
        }
      })


      //Custom Match Lobby Logic
      socket.on('IS OWNER', async() => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        io.to(userSocketMap[userId]).emit('IS OWNER', match.ownerId === userId);
      })
      //assumes that you are avalable when you are in a match lobby room
      socket.on('JOIN TEAM 1', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        match.joinTeam1(socket.request.user);
      });

      socket.on('JOIN TEAM 2', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        match.joinTeam2(socket.request.user);
      });

      socket.on('GET TEAM 1', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        match.emitTeam1(userId);
      });
      socket.on('GET TEAM 2', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        match.emitTeam2(userId);
      });
      socket.on('START MATCH', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        if (userStatus[userId] === constants.userStatus.CUSTOM_MATCH_OWNER && match.ownerId === userId) {
          match.start();
          notifyCustomMatchLobby();
        }
      })

      socket.on('RETURN TO LISTINGS', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        if (userId === match.ownerId) {
          match.removeMatch();
        } else {
          match.removePlayerFromLobby(userId);
          io.to(userSocketMap[userId]).emit('PAGE: CUSTOM LISTINGS');
        }
      });

      socket.on('MATCH OWNER', async() => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        io.to(userSocketMap[userId]).emit('MATCH OWNER', match.ownerName, match.ownerId);
      })
      socket.on('KICK PLAYER', async (kickedPlayerId) => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        if (userStatus[userId] === constants.userStatus.CUSTOM_MATCH_OWNER && match.ownerId === userId && kickedPlayerId !== match.ownerId) {
          match.removePlayerFromLobby(kickedPlayerId);
        }
      })

      socket.on('GET GAME STATE', async () => {
        const userId = socket.request.user.id;
        if (userStatus[userId] === constants.userStatus.IN_GAME) {
          const game = gameMap[userGameMap[userId]];
          const gameState = game.getGameState(userId);
          io.to(userSocketMap[userId]).emit('GAME STATE', gameState[0], gameState[1]);
        }
      })

      socket.on('FOLD', async () => {
        const userId = socket.request.user.id;
        if (userStatus[userId] === constants.userStatus.IN_GAME) {
          fold(userId);
        }
      });
      socket.on('CALL', async () => {
        const userId = socket.request.user.id;
        if (userStatus[userId] === constants.userStatus.IN_GAME) {
          call(userId);
        }
      });
      socket.on('RAISE', async (finalAmount) => {
        const userId = socket.request.user.id;
        if (userStatus[userId] === constants.userStatus.IN_GAME) {
          raise(userId, finalAmount);
        }
      });

      socket.on('GO TO LOBBY', async () => {
        const userId = socket.request.user.id;
        userLocation[userId] = constants.userLocation.MATCH_LOBBY;
        io.to(userSocketMap[userId]).emit('PAGE: MATCH LOBBY');
      });

      socket.on('RETURN TO GAME', async () => {
        const userId = socket.request.user.id;
        userLocation[userId] = constants.userLocation.GAME;
        io.to(userSocketMap[userId]).emit('PAGE: GAME');
      })

      socket.on('RETURN TO HOME', async () => {
        const userId = socket.request.user.id;
        userLocation[userId] = constants.userLocation.OTHER;
      })

      socket.on('GET MATCH STATUS', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
        io.to(userSocketMap[userId]).emit('MATCH STATUS', match.status);
      })

      socket.on('MATCH RESULTS', async () => {
        const userId = socket.request.user.id;
        const matchId = userMatchMap[userId];
        const match = matchMap[matchId];
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
        io.to(userSocketMap[userId]).emit('MATCH RESULTS', results);
      })

      socket.on('EXIT', async () => {
        leaveGame(socket.request.user.id);
        //logic for handling ranking
      });
    })
  },

  createNewNormalHUMatch: async (player1, player2) => {
    const newMatchId = uuidv4();
    const newMatch = new Match(newMatchId, newMatchId, 1, 'NOT CUSTOM', 'NOT CUSTOM', io, 'normal');
    matchMap[newMatchId] = newMatch;
    newMatch.joinTeam1(player1);
    newMatch.joinTeam2(player2);
    newMatch.start();
  },

  createNewRankedHUMatch: async (player1, player2) => {
    const newMatchId = uuidv4();
    const newMatch = new Match(newMatchId, newMatchId, 1, 'NOT CUSTOM', 'NOT CUSTOM', io, 'ranked');
    matchMap[newMatchId] = newMatch;
    newMatch.joinTeam1(player1);
    newMatch.joinTeam2(player2);
    newMatch.start();
  }

}
