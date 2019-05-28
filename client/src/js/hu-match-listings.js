import openSocket from 'socket.io-client';
const  newSocket = openSocket('http://localhost:8081/HULobby'); // to make adaptable

export const socket = newSocket;

export const newHUMatch = (name, numPlayers) => {
  console.log("requesting new HU Game");
  socket.emit("NEW HU MATCH", name, numPlayers);
}
