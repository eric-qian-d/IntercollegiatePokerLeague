import React from "react";
import ButtonBox from "./ButtonBox";
// import {socket} from "../../js/socket";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackSize : 0,
    }
  }

  render() {
    return (
      <div>
        <ButtonBox socket = {this.props.socket} />
      </div>
    )
  }
}

export default GameContainer;
