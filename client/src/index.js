import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import GamePagesContainer from "./components/game-pages-container";
// import { socket } from "./js/socket";



// import
//
// var socketToUse = socket;

const routing = (
  <Router>
    <div>
      <Route path = "/games" component = {GamePagesContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
