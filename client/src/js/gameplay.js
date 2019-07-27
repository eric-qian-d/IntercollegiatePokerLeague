export const seat = (socket, seatNumber) => {
  socket.emit("SEAT", seatNumber);
}

export const fold = (socket) => {
  socket.emit("FOLD");
}

export const call = (socket) => {
  socket.emit("CALL");
}

export const raise = (socket, finalAmount) => {
  socket.emit("RAISE", finalAmount);
}

export const surrender = (socket) => {
  socket.emit("SURRENDER");
}

export const lobby = (socket) => {
  socket.emit("GO TO LOBBY");
}

export const exit = (socket) => {
  socket.emit("EXIT");
}
