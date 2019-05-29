import React from "react";
import PlayerInfo from "./PlayerInfo";
import Hand from "./Hand";

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card1, card2, name, stackSize} = this.props;
    return (
      <div className = "PlayerContainer" >
        <Hand card1 = {card1} card2 = {card2}/>
        <PlayerInfo name = {name} stackSize = {stackSize}/>
      </div>

    )
  }
}

export default PlayerContainer;
