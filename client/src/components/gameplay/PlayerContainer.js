import React from "react";
import PlayerInfo from "./PlayerInfo";
import Hand from "./Hand";
// import "./PlayerContainer.css";

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card1, card2, name, stackSize, inHand} = this.props;
    if (inHand) {
      return (
        <div className = "PlayerContainer" >
          <Hand card1 = {card1} card2 = {card2}/>
          <PlayerInfo name = {name} stackSize = {stackSize}/>
        </div>
      )
    } else {
      return (
        <div className = "PlayerContainer" >
          <PlayerInfo name = {name} stackSize = {stackSize}/>
        </div>
      )
    }

  }
}

export default PlayerContainer;
