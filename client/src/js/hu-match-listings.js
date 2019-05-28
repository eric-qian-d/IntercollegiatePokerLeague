import openSocket from 'socket.io-client';
const  newSocket = openSocket('http://localhost:8081/HULobby'); // to make adaptable

export const socket = newSocket;

export const newHUMatch = (playerSocket, name, numPlayers) => {
  playerSocket.emit("NEW HU MATCH", name, numPlayers);
}

export const joinMatch = (playerSocket, matchId) => {
  playerSocket.emit("JOIN HU MATCH", matchId);
}
