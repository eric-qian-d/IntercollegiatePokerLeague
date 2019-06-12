import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import GamePagesContainer from "./components/game-pages-container";
import RegistrationContainer from "./components/registration/RegistrationContainer";
import LoginContainer from "./components/login/LoginContainer";
import GamesContainer from './components/games/GamesContainer';
import HomeContainer from "./components/home/HomeContainer";
import RankingsContainer from './components/rankings/RankingsContainer';

const routing = (
  <Router>
    <div>
      <Route exact path = "/" component = {HomeContainer}/>
      <Route path = "/registration" component = {RegistrationContainer}/>
      <Route path = "/login" component = {LoginContainer}/>
      <Route path = '/choose-game' component = {GamesContainer} />
      <Route path = "/games" component = {GamePagesContainer} />
      <Route path = "/rankings" component = {RankingsContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
