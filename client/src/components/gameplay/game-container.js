import React from "react";
import ButtonBox from "./button-box";
import {makeSocket} from "../../js/gameplay";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackSize : 0,
      socket : makeSocket(props.gameId),
    }
  }

  render() {
    return (
      <div>
        <ButtonBox socket = {this.state.socket} />
      </div>
    )
  }
}

export default GameContainer;
