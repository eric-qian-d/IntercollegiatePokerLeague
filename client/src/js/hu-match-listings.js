export const newHUMatch = (socket, name, numPlayers) => {
  socket.emit("NEW HU MATCH", name, numPlayers);
}

export const joinMatch = (socket, matchId) => {
  socket.emit("JOIN HU MATCH", matchId);
}
