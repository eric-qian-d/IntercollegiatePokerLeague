import openSocket from 'socket.io-client';

export const makeSocket = () => {
  return openSocket("http://localhost:8081/", { reconnection: false });// to make adaptable

}
