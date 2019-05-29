export const newHUMatch = (socket, name, numPlayers) => {
  socket.emit("NEW CUSTOM MATCH", name, numPlayers);
}

export const joinMatch = (socket, matchId) => {
  socket.emit("JOIN CUSTOM MATCH", matchId);
}
