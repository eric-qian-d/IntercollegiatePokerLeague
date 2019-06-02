import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import GamePagesContainer from "./components/game-pages-container";
import RegistrationContainer from "./components/registration/RegistrationContainer";
import LoginContainer from "./components/login/LoginContainer";
import HomeContainer from "./components/home/HomeContainer";

// <Route path = "/" component = {HomeContainer}/>
const routing = (
  <Router>
    <div>

      <Route path = "/registration" component = {RegistrationContainer}/>
      <Route path = "/login" component = {LoginContainer}/>
      <Route path = "/games" component = {GamePagesContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
