var Game = require('../game-logic/game');
const uuidv4 = require('uuid/v4');
const states = require('../states');
const constants = require('../constants');
const models = require('../../models');
const elo = require ('./elo');

const gameMap = states.gameMap;
const userLocation = states.userLocation;
const userGameMap = states.userGameMap;
const userStatus = states.userStatus;
const userSocketMap = states.userSocketMap;
const userMatchMap = states.userMatchMap;


//Use this class later, once Game works
module.exports = class Match {

  constructor(matchId, name, numPlayers, ownerId, ownerName, io, type) {
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.id = matchId;
    this.name = name;
    this.numPlayers = numPlayers;
    this.team1 = [];
    this.team2 = [];
    this.listeners = {};
    this.games = {};
    this.status = constants.matchStates.CREATION;
    this.type = type;
    this.io = io;

  }

  start() {
    const team1 = this.team1;
    const team2 = this.team2;
    const games = this.games;
    const io = this.io;
    if (team1.length === team2.length) {
      this.status = constants.matchStates.IN_PROGRESS;
      for(var i = 0; i < team1.length; i++) {
        const newGameId = uuidv4();
        const newGame = new Game(newGameId, '', 2, 10, this.id, userSocketMap, io, this);
        newGame.addPlayer(team1[i].id, 0, 10000, team1[i].firstName + ' ' + team1[i].lastName);
        newGame.addPlayer(team2[i].id, 1, 10000, team2[i].firstName + ' ' + team2[i].lastName);
        games[newGameId] = {
          team1Player : team1[i],
          team2Player : team2[i],
          gameId : newGameId,
          winner : 'none'
        }
        gameMap[newGameId] = newGame;
        userLocation[team1[i].id] = constants.userLocation.GAME;
        userLocation[team2[i].id] = constants.userLocation.GAME;
        userStatus[team1[i].id] = constants.userStatus.IN_GAME;
        userStatus[team2[i].id] = constants.userStatus.IN_GAME;
        //for ranked/normal games
        userMatchMap[team1[i].id] = this.id;
        userMatchMap[team2[i].id] = this.id;
        userGameMap[team1[i].id] = newGameId;
        userGameMap[team2[i].id] = newGameId;
        io.to(userSocketMap[team1[i].id]).emit('PAGE: GAME');
        io.to(userSocketMap[team2[i].id]).emit('PAGE: GAME');
      }
    }
    console.log(this.type);
  }

  joinTeam1(newUser) {
    if (this.team1.length < this.numPlayers) {
      const io = this.io;
      this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team1.push(newUser);
      const team1names = this.getTeam1Names();
      const team2names = this.getTeam2Names();
      Object.keys(this.listeners).forEach(playerId => {
        io.to(userSocketMap[playerId]).emit('TEAM 1', team1names, false, this.team1.length < this.numPlayers)
        io.to(userSocketMap[playerId]).emit('TEAM 2', team2names, false, this.team2.length < this.numPlayers)
      })
      io.to(userSocketMap[this.ownerId]).emit('TEAM 1', team1names, true, this.team1.length < this.numPlayers)
      io.to(userSocketMap[this.ownerId]).emit('TEAM 2', team2names, true, this.team2.length < this.numPlayers)
    }
  }

  joinTeam2(newUser) {
    if (this.team2.length < this.numPlayers) {
      const io = this.io;
      this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2.push(newUser);
      const team1names = this.getTeam1Names();
      const team2names = this.getTeam2Names();
      Object.keys(this.listeners).forEach(playerId => {
        io.to(userSocketMap[playerId]).emit('TEAM 1', team1names, false, this.team1.length < this.numPlayers)
        io.to(userSocketMap[playerId]).emit('TEAM 2', team2names, false, this.team2.length < this.numPlayers)
      })
      io.to(userSocketMap[this.ownerId]).emit('TEAM 1', team1names, true, this.team1.length < this.numPlayers)
      io.to(userSocketMap[this.ownerId]).emit('TEAM 2', team2names, true, this.team2.length < this.numPlayers)
    }
  }

  exit(user) {
    const io = this.io;
    this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== user.id)});
    this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== user.id)});
    const userId = user.id
    delete this.listeners[userId];
    userMatchMap[userId] = '';
    userGameMap[userId] = '';
    userStatus[userId] = constants.userStatus.AVAILABLE;
    userLocation[userId] = constants.userLocation.CUSTOM_LISTINGS;
    const team1names = this.getTeam1Names();
    const team2names = this.getTeam2Names();
    Object.keys(this.listeners).forEach(playerId => {
      io.to(userSocketMap[playerId]).emit('TEAM 1', team1names, false, this.team1.length < this.numPlayers)
      io.to(userSocketMap[playerId]).emit('TEAM 2', team2names, false, this.team2.length < this.numPlayers)
    })
    io.to(userSocketMap[this.ownerId]).emit('TEAM 1', team1names, true, this.team1.length < this.numPlayers)
    io.to(userSocketMap[this.ownerId]).emit('TEAM 2', team2names, true, this.team2.length < this.numPlayers)
  }

  getTeam1Names() {
    const team1names = this.team1.map(user => {
      return (user.firstName + ' ' + user.lastName);
    });
    return team1names;
  }

  getTeam2Names() {
    const team2names = this.team2.map(user => {
      return (user.firstName + ' ' + user.lastName);
    });
    return team2names;
  }

  end() {
    this.status = constants.matchStates.FINISHED;
    //handle redirecting players to the end screen

    if (this.type === 'ranked') {
      //logic to take care of adjusting player ratings
      if (Object.keys(this.games).length === 1) {
        //this only executes once, so it's fine
        Object.values(this.games).forEach((game, gameNumber) => {
          console.log(game);
          const winner = game.winner === game.team1Player.id ? game.team1Player : game.team2Player;
          const loser = game.winner === game.team1Player.id ? game.team2Player : game.team1Player;
          const [winnerElo, loserElo] = elo.findNewElo(winner.rankedHURanking, loser.rankedHURanking);
          models.User.update({rankedHURanking: winnerElo}, {where: {id: winner.id}});
          models.User.update({rankedHURanking: loserElo}, {where: {id: loser.id}});
        })
      }

    } else if (this.type === 'normal') {
      //logic to take care of adjusting player ratings
      if (Object.keys(this.games).length === 1) {
        //this only executes once, so it's fine
        Object.values(this.games).forEach((game, gameNumber) => {
          const winner = game.winner === team1Player.id ? game.team1Player : game.team2Player;
          const loser = game.winner === team1Player.id ? game.team2Player : game.team1Player;
          const [winnerElo, loserElo] = elo.findNewElo(winner.normalHURanking, loser.normalHURanking);
          models.User.update({normalHURanking: winnerElo}, {where: {id: winner.id}});
          models.User.update({normalHURanking: loserElo}, {where: {id: loser.id}});
        })
      }
    }
    this.team1.forEach(user => {
      userStatus[user.id] = constants.userStatus.AVAILABLE;
    })
    this.team2.forEach(user => {
      userStatus[user.id] = constants.userStatus.AVAILABLE;
    })
  }


  notifyEnd() {

  }

}
