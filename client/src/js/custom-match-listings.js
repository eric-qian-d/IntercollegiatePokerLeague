export const makeNewHUMatchRequest = (socket) => {
  socket.emit('MAKE NEW HU MATCH REQ');
}

export const joinMatch = (socket, matchId) => {
  socket.emit('JOIN CUSTOM MATCH', matchId);
}
