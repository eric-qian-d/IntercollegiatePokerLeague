import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducer";
import socketMiddleware from './store/socket.js';
const store = createStore(rootReducer, applyMiddleware(socketMiddleware));

export default store;
