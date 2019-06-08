import React from 'react';

import {lobby} from "../../js/gameplay";


class ReturnToLobbyButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button className = "ReturnToLobbyButton" onClick = {() => {lobby(this.props.socket)}}>
        {"Return To Lobby"}
      </button>
    )
  }
}

export default ReturnToLobbyButton;
