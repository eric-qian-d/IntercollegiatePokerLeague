import React from "react";
import PlayerListing from "./PlayerListing";
import './PlayersContainer.css';

class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  joinTeamLogic() {
    this.props.updateTeamFunction(this.props.socket);
  }

  render() {
    const {renderJoin, renderKick, socket} = this.props;
    var playersList = this.props.players.map((p, i) => {
      return (
        <div key = {p.id}>
          <PlayerListing playerName = {p.name} playerId = {p.id} status = 'lobby' renderKick = {renderKick} socket = {socket}/>
        </div>
      )

    })
    if (renderJoin) {
      return (
          <div className = 'PlayersContainer'>
            {playersList}
            <button onClick = {() => {this.joinTeamLogic()}}>
              Join Team
            </button>
          </div>
      )
    } else {
      return (
        <div className = 'PlayersContainer'>
          {playersList}
        </div>
      )
    }

  }
}

export default PlayersContainer;
