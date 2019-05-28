import React from "react";
import PlayerContainer from "./lobby-player-container";
import {getTeam1, getTeam2} from "../../js/hu-match-lobby";

class TeamContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1 : [],
      team2 : [],
    }
  }

  render() {
    return(
      <div>
        <PlayerContainer players = {this.state.team1}/>
        <PlayerContainer players = {this.state.team2}/>
      </div>
    )
  }

  componentDidMount() {
    getTeam1(props.socket);
    getTeam2(props.socket);
    props.socket.on(("TEAM 1", updatedTeam1) => {
      this.setState({team1 : updatedTeam1});
    });
    props.socket.on(("TEAM 2", updatedTeam2) => {
      this.setState({team2 : updatedTeam2});
    });
  }
}

export default TeamContainer;
