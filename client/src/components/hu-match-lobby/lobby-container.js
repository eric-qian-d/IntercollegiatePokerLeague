import React from "react";
import TeamContainer from "./team-container";
import {makeSocket} from "../../js/hu-match-lobby";

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : makeSocket(props.matchId),
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
