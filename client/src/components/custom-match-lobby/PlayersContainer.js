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
    const {renderJoin} = this.props;
    var playersList = this.props.players.map((p, i) => {
      return (
        <div key = {i}>
          <PlayerListing player = {p} status = 'lobby'/>
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
