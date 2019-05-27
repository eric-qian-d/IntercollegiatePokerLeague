import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import ButtonBox from './components/gameplay/button-box';
import HULobby from "./components/hu-match-lobby/lobby";

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<ButtonBox />, document.getElementById('root'));
ReactDOM.render(<HULobby />, document.getElementById('root'));
registerServiceWorker();
