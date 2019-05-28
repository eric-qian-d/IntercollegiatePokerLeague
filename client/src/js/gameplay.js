export const seat = (socket, seatNumber) => {
  socket.emit("SEAT", seatNumber);
}

export const fold = (socket) => {
  socket.emit("FOLD");
}

export const call = (socket) => {
  console.log("CALLING");
  console.log(socket);
  socket.emit("CALL");
}

export const raise = (socket, finalAmount) => {
  socket.emit("RAISE", finalAmount);
}

export const exit = (socket) => {
  socket.emit("EXIT");
}
