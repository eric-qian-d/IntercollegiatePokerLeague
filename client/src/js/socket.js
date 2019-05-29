import openSocket from 'socket.io-client';

export const makeSocket = () => {
  return openSocket("http://localhost:8081/");// to make adaptable

}
