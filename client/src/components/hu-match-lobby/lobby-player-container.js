import React from "react";
import PlayerListing from "./lobby-player-listing";

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var playersList = props.players.map((p, i) => {
      <div key = {i}>
        <PlayerListing player = {p}/>
      </div>
    })
    return (
      <div>
        {playersList}
      </div>
    )
  }
}

export default PlayerContainer;
