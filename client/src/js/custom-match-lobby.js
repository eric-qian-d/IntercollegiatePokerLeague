export const joinTeam1 = (socket) => {
  console.log('requesting to join 1');
  socket.emit('JOIN TEAM 1');
}

export const joinTeam2 = (socket) => {
  console.log('requesting to join 2');
  socket.emit('JOIN TEAM 2');
}

export const getTeam1 = (socket) => {
  console.log('requesting to get 1');
  socket.emit('GET TEAM 1');
}

export const getTeam2 = (socket) => {
  console.log('requesting to get 2');
  socket.emit('GET TEAM 2');
}

export const startMatch = (socket) => {
  socket.emit('START MATCH');
}

export const kickPlayer = (socket, playerId) => {
  socket.emit('KICK PLAYER', playerId)
}

export const returnToListings = (socket) => {
  socket.emit('RETURN TO LISTINGS');
}

export const getResults = (socket) => {
  socket.emit('MATCH RESULTS');
}
