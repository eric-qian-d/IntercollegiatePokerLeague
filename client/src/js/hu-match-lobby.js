export const joinTeam1 = (socket) => {
  console.log('requesting 1');
  socket.emit("JOIN TEAM 1");
}

export const joinTeam2 = (socket) => {
  console.log('requesting 2');
  socket.emit("JOIN TEAM 2");
}

export const getTeam1 = (socket) => {
  socket.emit("GET TEAM 1");
}

export const getTeam2 = (socket) => {
  socket.emit("GET TEAM 2");
}
