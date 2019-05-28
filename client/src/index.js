import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import HUMatchListing from "./components/hu-match-listing/container";
import GameContainer from "./components/gameplay/game-container";
import HUMatchLobby from "./components/hu-match-lobby/lobby-container";

const routing = (
  <Router>
    <div>
      <Route path = "/HULobby" component = {HUMatchListing} />
      <Route path = "/game/:gameId" component = {GameContainer} />
      <Route path = "/match/:matchId" component = {HUMatchLobby} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
