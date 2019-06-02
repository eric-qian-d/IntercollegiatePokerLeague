var game = require("../game-logic/game");


//Use this class later, once Game works
module.exports = class Match {

  constructor(matchId, name, numPlayers, ownerId) {
    this.ownerId = ownerId;
    this.id = matchId;
    this.name = name;
    this.numPlayers = numPlayers;
    this.team1 = [];
    this.team2 = [];
    this.listeners = {};
    this.games = {};
    this.inProgress = false;
  }






}
