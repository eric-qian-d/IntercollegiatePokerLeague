import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import GamePagesContainer from "./components/game-pages-container";
import RegistrationContainer from "./components/registration/RegistrationContainer";


const routing = (
  <Router>
    <div>
      <Route path = "/registration" component = {RegistrationContainer}/>
      <Route path = "/games" component = {GamePagesContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
