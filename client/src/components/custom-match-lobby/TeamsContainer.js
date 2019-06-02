import React from "react";
import PlayersContainer from "./PlayersContainer";
import {getTeam1, getTeam2, joinTeam1, joinTeam2} from "../../js/custom-match-lobby";

class TeamsContainer extends React.Component {
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
        <PlayersContainer players = {this.state.team1} socket = {this.props.socket} updateTeamFunction = {joinTeam1}/>
        <PlayersContainer players = {this.state.team2} socket = {this.props.socket} updateTeamFunction = {joinTeam2}/>
      </div>
    )
  }

  componentDidMount() {
    getTeam1(this.props.socket);
    getTeam2(this.props.socket);
    this.props.socket.on("TEAM 1", updatedTeam1 => {
      this.setState({team1 : updatedTeam1});
    });
    this.props.socket.on("TEAM 2", updatedTeam2 => {
      this.setState({team2 : updatedTeam2});
    });
  }
}

export default TeamsContainer;
