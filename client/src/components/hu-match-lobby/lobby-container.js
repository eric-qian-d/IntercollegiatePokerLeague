import React from "react";
import TeamContainer from "./team-container";
// import {socket} from "../../js/socket";

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket, matchId} = this.props;
    return (
      <div>
      {this.props.matchId}
        <TeamContainer socket = {socket} matchId = {matchId}/>
      </div>
    )
  }
}

export default LobbyContainer;
