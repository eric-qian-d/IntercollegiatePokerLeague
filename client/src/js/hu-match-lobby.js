export const joinTeam1 = (socket, matchId) => {
  console.log('requesting to join 1');
  socket.emit("JOIN TEAM 1", matchId);
}

export const joinTeam2 = (socket, matchId) => {
  console.log('requesting to join 2');
  socket.emit("JOIN TEAM 2", matchId);
}

export const getTeam1 = (socket, matchId) => {
  console.log("requesting to get 1");
  socket.emit("GET TEAM 1", matchId);
}

export const getTeam2 = (socket, matchId) => {
  console.log("requesting to get 2");
  socket.emit("GET TEAM 2", matchId);
}
