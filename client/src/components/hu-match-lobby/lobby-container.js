import React from "react";
import TeamContainer from "./team-container";
import {socket} from "../../js/socket";

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : socket,
    };
  }

  render() {
    return (
      <div>
        <TeamContainer socket = {this.state.socket} />
      </div>
    )
  }
}

export default LobbyContainer;
