import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { socket } from "./js/socket";



import HUMatchListing from "./components/hu-match-listing/container";
import GameContainer from "./components/gameplay/game-container";
import HUMatchLobby from "./components/hu-match-lobby/lobby-container";

var socketToUse = socket;

const routing = (
  <Router>
    <div>
      <Route path = "/HULobby" component = {HUMatchListing} />
      <Route path = "/game/:gameId" render = {(props) => <GameContainer socket = {socketToUse}/>} />
      <Route path = "/match/:matchId" component = {HUMatchLobby} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
