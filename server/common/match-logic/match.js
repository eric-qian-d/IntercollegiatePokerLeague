var Game = require('../game-logic/game');
const uuidv4 = require('uuid/v4');
const states = require('../states');
const constants = require('../constants');
const models = require('../../models');
const elo = require ('./elo');
const userLogic = require('../userLogic');

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
        newGame.addPlayer(team1[i].id, 0, 1000, team1[i].firstName + ' ' + team1[i].lastName);
        newGame.addPlayer(team2[i].id, 1, 1000, team2[i].firstName + ' ' + team2[i].lastName);
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
        console.log(userSocketMap);
        io.to(userSocketMap[team1[i].id]).emit('PAGE', constants.userLocation.GAME);
        io.to(userSocketMap[team2[i].id]).emit('PAGE', constants.userLocation.GAME);
      }
    }
  }

  joinTeam1(newUser) {
    if (this.team1.length < this.numPlayers) {
      const io = this.io;
      this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team1.push(newUser);
      this.notifyTeamChange();
    }
  }

  joinTeam2(newUser) {
    if (this.team2.length < this.numPlayers) {
      const io = this.io;
      this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
      this.team2.push(newUser);
      this.notifyTeamChange();
    }
  }

  notifyTeamChange() {
    Object.keys(this.listeners).forEach(userId => {
      this.emitTeam1(userId);
      this.emitTeam2(userId);
    })
    this.emitTeam1(this.ownerId);
    this.emitTeam2(this.ownerId);
  }

  emitTeam1(userId) {
    const team1 = this.getTeam1Players();
    this.io.to(userSocketMap[userId]).emit('TEAM 1', team1, userId === this.ownerId, this.team1.length < this.numPlayers)
  }

  emitTeam2(userId) {
    const team2 = this.getTeam2Players();
    this.io.to(userSocketMap[userId]).emit('TEAM 2', team2, userId === this.ownerId, this.team2.length < this.numPlayers)
  }

  removePlayerFromLobby(userId) {
    const io = this.io;
    this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== userId)});
    delete this.listeners[userId];
    userMatchMap[userId] = '';
    userGameMap[userId] = '';
    userStatus[userId] = constants.userStatus.AVAILABLE;
    userLocation[userId] = constants.userLocation.CUSTOM_LISTINGS;
    io.to(userSocketMap[userId]).emit('PAGE', userLocation[userId]);
    this.notifyTeamChange();
  }

  getTeam1Players() {
    const team1 = this.team1.map(user => {
      return (
        {
          name: user.firstName + ' ' + user.lastName,
          id: user.id,
        }
      )
    });
    return team1;
  }

  getTeam2Players() {
    const team2 = this.team2.map(user => {
      return (
        {
          name: user.firstName + ' ' + user.lastName,
          id: user.id,
        }
      )
    });
    return team2;
  }

  removeMatch() {
    //TODO MAKE SURE USERS CAN'T ACCIDENTALY JOIN RIGHT AS A MATCH IS BEING DESTROYED
    this.status = constants.matchStates.REMOVED;
    console.log(this.listeners);
    Object.keys(this.listeners).forEach(userId => {
      this.removePlayerFromLobby(userId);
    })
    this.removePlayerFromLobby(this.ownerId);
    userStatus[this.ownerId] = constants.userStatus.AVAILABLE;
    userLocation[this.ownerId] = constants.userLocation.CUSTOM_LISTINGS;
    this.io.to(userSocketMap[this.ownerId]).emit(userLocation[this.ownerId]);
  }

  end() {
    this.status = constants.matchStates.FINISHED;
    //handle redirecting players to the end screen

    if (this.type === 'ranked') {
      //logic to take care of adjusting player ratings
      if (Object.keys(this.games).length === 1) {
        //this only executes once, so it's fine
        Object.values(this.games).forEach(async (game, gameNumber) => {
          const winnerId = game.winner === game.team1Player.id ? game.team1Player.id : game.team2Player.id;
          const loserId = game.winner === game.team1Player.id ? game.team2Player.id : game.team1Player.id;
          const winner = await userLogic.getUserById(winnerId);
          const loser = await userLogic.getUserById(loserId);
          const winnerOldElo = winner.rankedHURanking;
          const loserOldElo = loser.rankedHURanking;
          const [winnerElo, loserElo] = elo.findNewElo(winnerOldElo, loserOldElo);
          models.User.update({rankedHURanking: winnerElo}, {where: {id: winner.id}});
          models.User.update({rankedHURanking: loserElo}, {where: {id: loser.id}});
        })
      }

    } else if (this.type === 'normal') {
      //logic to take care of adjusting player ratings
      if (Object.keys(this.games).length === 1) {
        //this only executes once, so it's fine
        Object.values(this.games).forEach(async (game, gameNumber) => {
          const winnerId = game.winner === game.team1Player.id ? game.team1Player.id : game.team2Player.id;
          const loserId = game.winner === game.team1Player.id ? game.team2Player.id : game.team1Player.id;
          const winner = await userLogic.getUserById(winnerId);
          const loser = await userLogic.getUserById(loserId);
          const winnerOldElo = winner.normalHURanking;
          const loserOldElo = loser.normalHURanking;
          const [winnerElo, loserElo] = elo.findNewElo(winnerOldElo, loserOldElo);
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
