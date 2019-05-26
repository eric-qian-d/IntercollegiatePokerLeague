import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8081'); // to make adaptable

export const fold = () => {
  socket.emit("FOLD");
}

export const call = () => {
  socket.emit("CALL");
}

export const raise = (finalAmount) => {
  socket.emit("RAISE", finalAmount);
}
