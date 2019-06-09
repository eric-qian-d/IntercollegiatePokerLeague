import React from 'react';

class Navbar extends React.Component {
  render() {
    return(
      <ul id="nav">
        <li><a href="/">Home</a></li>
        <li><a href="/games">Games</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    )
  }
}

export default Navbar;
