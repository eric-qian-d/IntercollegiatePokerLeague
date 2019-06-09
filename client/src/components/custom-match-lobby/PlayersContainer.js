import React from "react";
import PlayerListing from "./PlayerListing";
import './PlayersContainer.css';

class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  joinTeamLogic() {
    console.log("in join team logic");
    this.props.updateTeamFunction(this.props.socket);
  }

  render() {
    var playersList = this.props.players.map((p, i) => {
      return (
        <div key = {i}>
          <PlayerListing player = {p} status = 'lobby'/>
        </div>
      )

    })
    return (
        <div className = 'PlayersContainer'>
          {playersList}
          <button onClick = {() => {this.joinTeamLogic()}}>
            Join Team
          </button>
        </div>
    )
  }
}

export default PlayersContainer;
