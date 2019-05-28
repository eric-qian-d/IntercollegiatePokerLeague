import React from "react";
import PlayerContainer from "./lobby-player-container";
import {getTeam1, getTeam2, joinTeam1, joinTeam2} from "../../js/hu-match-lobby";

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
        <PlayerContainer players = {this.state.team1} socket = {this.props.socket} updateTeamFunction = {joinTeam1} matchId = {this.props.matchId}/>
        <PlayerContainer players = {this.state.team2} socket = {this.props.socket} updateTeamFunction = {joinTeam2} matchId = {this.props.matchId}/>
      </div>
    )
  }

  componentDidMount() {
    console.log("Mounting");
    getTeam1(this.props.socket, this.props.matchId);
    getTeam2(this.props.socket, this.props.matchId);
    this.props.socket.on("TEAM 1", updatedTeam1 => {
      console.log('received team 1');
      console.log(updatedTeam1);
      this.setState({team1 : updatedTeam1});
    });
    this.props.socket.on("TEAM 2", updatedTeam2 => {
      console.log('received team 2');
      console.log(updatedTeam2);
      this.setState({team2 : updatedTeam2});
    });
  }
}

export default TeamContainer;
