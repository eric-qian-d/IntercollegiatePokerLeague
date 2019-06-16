import React from "react";
import PlayersContainer from "./PlayersContainer";
import {getTeam1, getTeam2, joinTeam1, joinTeam2} from "../../js/custom-match-lobby";
import './TeamsContainer.css';

class TeamsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1 : [],
      team2 : [],
      renderJoin1: true,
      renderJoin2: true,
    }
  }

  render() {
    return(
      <div className = 'TeamsContainer flex-container'>
        <PlayersContainer players = {this.state.team1} socket = {this.props.socket} updateTeamFunction = {joinTeam1} renderJoin = {this.state.renderJoin1}/>
        <PlayersContainer players = {this.state.team2} socket = {this.props.socket} updateTeamFunction = {joinTeam2} renderJoin = {this.state.renderJoin2}/>
      </div>
    )
  }

  componentDidMount() {
    getTeam1(this.props.socket);
    getTeam2(this.props.socket);
    this.props.socket.on("TEAM 1", (updatedTeam1, isOwner, renderJoin1) => {
      this.setState({team1 : updatedTeam1});
      this.setState({renderJoin1: renderJoin1});
    });
    this.props.socket.on("TEAM 2", (updatedTeam2, isOwner, renderJoin2) => {
      this.setState({team2 : updatedTeam2});
      this.setState({renderJoin2: renderJoin2});
    });
  }
}

export default TeamsContainer;
