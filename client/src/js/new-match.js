export const addNewHUMatch = (socket, name, numPlayers, numBlinds) => {
  socket.emit('NEW CUSTOM MATCH', name, numPlayers, numBlinds);
}
