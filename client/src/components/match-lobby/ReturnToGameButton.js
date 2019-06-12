import React from 'react';
import {returnToGame} from "../../js/match-lobby";

class ReturnToGameButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const {socket} = this.props;
    returnToGame(socket);
  }

  render() {
    return (
      <button className = 'ReturnToGameButton' onClick = {() => {this.onClick()}}>
        Return to Game
      </button>
    )
  }
}

export default ReturnToGameButton;
