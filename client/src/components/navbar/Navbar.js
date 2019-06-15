import React from 'react';
import './Navbar.css';

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
          fetch("http://localhost:8081/logout", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
            credentials : 'include',
            withCredentials : true,
          });
          this.props.history.push('/');
        }
      }>
      Log out
      </button>
      </ul>
    )
  }
}

export default Navbar;
