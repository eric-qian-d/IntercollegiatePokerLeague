import { makeSocket } from '../js/socket';

const socketMiddleware = store => {
  const socket = makeSocket();

  return next => action => {
    console.log(action);
    switch (action.type) {
      case ('EMIT_TEST'):
        console.log('in the middleware');
        socket.emit('TEST')
        break;

      default:
        break;
    }
  }

}

export default socketMiddleware;
