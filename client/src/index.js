import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import ButtonBox from './components/gameplay/button-box';
import HUListingContainer from "./components/hu-match-lobby/listing-container";

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<ButtonBox />, document.getElementById('root'));
ReactDOM.render(<HUListingContainer />, document.getElementById('root'));
registerServiceWorker();
