import React from 'react';
import './Navbar.css';
import vars from '../../vars';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  render() {
    return(
      <ul id="nav">
        <li><a href="/">Home</a></li>
        <li><a href="/choose-game">Games</a></li>
        <li><a href="/rankings">Rankings</a></li>
        <button onClick = {()=> {
          fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/logout', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
            credentials : 'include',
            withCredentials : true,
          });
          this.props.history.push('/login');
        }
      }>
      Log out
      </button>
      </ul>
    )
  }
}

export default Navbar;
