var game = require("../game-logic/game");


//Use this class later, once Game works
module.exports = class Match {

  constructor(matchId, name, numPlayers) {
    this.id = matchId;
    this.name = name;
    this.numPlayers = numPlayers;
    // this.socket = socket;
    this.team1 = [];
    this.team2 = [];
    // this.socket.on("connection", socket => {
    //   socket.on("JOIN TEAM 1", async () => {
    //     this.team1.push(socket.id);
    //     this.team2 = this.team2.filter(id => {return id === socket.id});
    //     this.socket.emit("TEAM 1");
    //     this.socket.emit("TEAM 2");
    //   });
    //   socket.on("JOIN TEAM 2", async () => {
    //     this.team2.push(socket.id);
    //     this.team1 = this.team1.filter(id => {return id === socket.id});
    //     this.socket.emit("TEAM 1");
    //     this.socket.emit("TEAM 2");
    //   });
    //   socket.on("GET TEAM 1", async () => {
    //     this.socket.emit("TEAM 1", this.team1);
    //   });
    //   socket.on("GET TEAM 2", async () => {
    //     this.socket.emit("TEAM 2", this.team2);
    //   });
    // });
  }


}
