import { makeSocket } from '../js/socket';
import { push } from 'react-router-redux'

const socketMiddleware = store => {
  const socket = makeSocket();

  return next => action => {
    console.log(action);
    switch (action.type) {
      case ('EMIT_TEST'):
        socket.emit('TEST')
        break;

      default:
        break;
    }
    return next(action)
  }


}

export default socketMiddleware;
