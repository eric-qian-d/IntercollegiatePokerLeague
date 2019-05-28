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
      {this.props.matchId}
        <TeamContainer socket = {this.state.socket} matchId = {this.props.match.params.matchId}/>
      </div>
    )
  }
}

export default LobbyContainer;
