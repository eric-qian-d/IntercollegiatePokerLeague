import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8081'); // to make adaptable

export const playerSocket = socket;

export const seat = (seatNumber) => {
  socket.emit("SEAT", seatNumber);
}

export const fold = () => {
  socket.emit("FOLD");
}

export const call = () => {
  console.log("CALLING");
  console.log(socket);
  socket.emit("CALL");
}

export const raise = (finalAmount) => {
  socket.emit("RAISE", finalAmount);
}

export const exit = () => {
  socket.emit("EXIT");
}
