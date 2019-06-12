export const returnToGame = (socket) => {
  socket.emit('RETURN TO GAME');
}

export const returnToHome = (socket) => {
  socket.emit('RETURN TO HOME');
}
