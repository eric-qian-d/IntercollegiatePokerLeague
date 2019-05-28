import React from "react";
import ButtonBox from "./button-box";
import {socket} from "../../js/socket";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackSize : 0,
      socket : socket,
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
