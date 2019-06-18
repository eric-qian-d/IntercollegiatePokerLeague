import React from 'react';
import {kickPlayer} from '../../js/custom-match-lobby';

class KickPlayerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    const {socket, playerId} = this.props;
    kickPlayer(socket, playerId);
  }

  render() {
    return (
      <button onClick = {() => {this.handleClick()}}>
        Kick
      </button>
    )
  }

}

export default KickPlayerButton;
