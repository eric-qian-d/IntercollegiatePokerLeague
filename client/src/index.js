import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import GamePagesContainer from "./components/game-pages-container";


const routing = (
  <Router>
    <div>
      <Route path = "/games" component = {GamePagesContainer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
