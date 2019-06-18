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
      isOwner : false,
    }
  }

  render() {
    const {team1, team2, renderJoin1, renderJoin2, renderKick} = this.state;
    return(
      <div className = 'TeamsContainer flex-container'>
        <PlayersContainer players = {team1} socket = {this.props.socket} updateTeamFunction = {joinTeam1} renderJoin = {renderJoin1} renderKick = {renderKick}/>
        <PlayersContainer players = {team2} socket = {this.props.socket} updateTeamFunction = {joinTeam2} renderJoin = {renderJoin2} renderKick = {renderKick}/>
      </div>
    )
  }

  componentDidMount() {
    getTeam1(this.props.socket);
    getTeam2(this.props.socket);
    this.props.socket.on("TEAM 1", (updatedTeam1, renderKick, renderJoin1) => {
      this.setState({
        team1 : updatedTeam1,
        renderJoin1: renderJoin1,
        renderKick: renderKick,
      });
    });
    this.props.socket.on("TEAM 2", (updatedTeam2, renderKick, renderJoin2) => {
      this.setState({
        team2 : updatedTeam2,
        renderJoin2: renderJoin2,
        renderKick: renderKick,
      });
    });
  }
}

export default TeamsContainer;
