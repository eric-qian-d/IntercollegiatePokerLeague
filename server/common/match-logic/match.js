var Game = require("../game-logic/game");
const uuidv4 = require('uuid/v4');
const states = require('../states');

const gameMap = states.gameMap;
const playerStatusMap = states.playerStatusMap;
const playerGameMap = states.playerGameMap;
const playerSocketMap = states.playerSocketMap


//Use this class later, once Game works
module.exports = class Match {

  constructor(matchId, name, numPlayers, ownerId, io, type) {
    this.ownerId = ownerId;
    this.id = matchId;
    this.name = name;
    this.numPlayers = numPlayers;
    this.team1 = [];
    this.team2 = [];
    this.listeners = {};
    this.games = {};
    this.status = 'creation';
    this.io = io;
    this.type = type;
  }

  start() {
    const team1 = this.team1;
    const team2 = this.team2;
    const games = this.games;
    const io = this.io;
    if (team1.length === team2.length) {
      this.status = 'in progress';
      for(var i = 0; i < team1.length; i++) {
        const newGameId = uuidv4();
        const newGame = new Game(newGameId, "", 2, 10, this.id, playerSocketMap, io, this);
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

  joinTeam1(newUser) {
    const io = this.io;
    this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
    this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
    this.team1.push(newUser);
    const team1names = this.getTeam1Names();
    const team2names = this.getTeam2Names();
    Object.keys(this.listeners).forEach(playerId => {
      io.to(playerSocketMap[playerId]).emit("TEAM 1", team1names, false);
      io.to(playerSocketMap[playerId]).emit("TEAM 2", team2names, false);
    })
    io.to(playerSocketMap[this.ownerId]).emit("TEAM 1", team1names, true);
    io.to(playerSocketMap[this.ownerId]).emit("TEAM 2", team2names, true);
  }

  joinTeam2(newUser) {
    const io = this.io;
    this.team1 = this.team1.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
    this.team2 = this.team2.filter(secondaryUser => {return (secondaryUser.id !== newUser.id)});
    this.team2.push(newUser);
    const team1names = this.getTeam1Names();
    const team2names = this.getTeam2Names();
    Object.keys(this.listeners).forEach(playerId => {
      io.to(playerSocketMap[playerId]).emit("TEAM 1", team1names, false);
      io.to(playerSocketMap[playerId]).emit("TEAM 2", team2names, false);
    })
    io.to(playerSocketMap[this.ownerId]).emit("TEAM 1", team1names, true);
    io.to(playerSocketMap[this.ownerId]).emit("TEAM 2", team2names, true);
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
    this.status = 'finished';
      // this.io.to(this.parentMatchId).emit("MATCH ENDED");
  }


  notifyEnd() {

  }






}
