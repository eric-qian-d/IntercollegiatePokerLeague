import React from "react";
import TeamsContainer from "./TeamsContainer";
// import BeginMatchButton from "./BeginMatchButton";

class CustomMatchLobbyContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket, matchId} = this.props;
    return (
      <div>
      {this.props.matchId}
        <TeamsContainer socket = {socket}/>
      </div>
    )
  }
}

export default CustomMatchLobbyContainer;
