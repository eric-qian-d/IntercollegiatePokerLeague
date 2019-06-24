export const addNewHUMatch = (socket, name, numPlayers) => {
  socket.emit('NEW CUSTOM MATCH', name, numPlayers);
}
