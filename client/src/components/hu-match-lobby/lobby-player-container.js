import React from "react";
import PlayerListing from "./lobby-player-listing";

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
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
          <button onclick = {this.props.updateTeamFunction(this.props.socket)}>
            Join Team
          </button>
        </div>
      </div>
    )
  }
}

export default PlayerContainer;
