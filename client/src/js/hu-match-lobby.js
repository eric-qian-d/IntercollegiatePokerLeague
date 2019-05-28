import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8081/HULobby'); // to make adaptable

export const playerSocket = socket;

export const newHUMatch = (name, numPlayers) => {
  console.log("requesting new HU Game");
  socket.emit("NEW HU MATCH", name, numPlayers);
}
