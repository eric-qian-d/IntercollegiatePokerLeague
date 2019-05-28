// import React from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';
// import ButtonBox from './components/gameplay/button-box';
// import HULobby from "./components/hu-match-listing/lobby";
//
// import registerServiceWorker from './registerServiceWorker';
//
// // ReactDOM.render(<ButtonBox />, document.getElementById('root'));
// ReactDOM.render(<HULobby />, document.getElementById('root'));
// registerServiceWorker();
//
//
import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import HUMatchListing from "./components/hu-match-listing/container";
import GameContainer from "./components/gameplay/game-container";

const routing = (
  <Router>
    <div>
      <Route path = "/HULobby" component = {HUMatchListing} />
      <Route path = "/game" component = {GameContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
