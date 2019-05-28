import React from "react";

class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.player.playerName}
      </div>
    )
  }
}

export default PlayerListing;
