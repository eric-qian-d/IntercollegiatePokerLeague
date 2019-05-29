import React from "react";
import PlayerListing from "./PlayerListing";

class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  joinTeamLogic() {
    console.log("in join team logic");
    this.props.updateTeamFunction(this.props.socket, this.props.matchId);
  }

  render() {
    var playersList = this.props.players.map((p, i) => {
      return (
        <div key = {i}>
          <PlayerListing player = {p}/>
        </div>
      )

    })
    return (
      <div>
        <div>
          {playersList}
        </div>
        <div>
          <button onClick = {() => {this.joinTeamLogic()}}>
            Join Team
          </button>
        </div>
      </div>
    )
  }
}

export default PlayersContainer;
