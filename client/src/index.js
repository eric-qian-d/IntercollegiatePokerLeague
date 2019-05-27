import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import ButtonBox from './components/gameplay/button-box';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ButtonBox />, document.getElementById('root'));
registerServiceWorker();
