import React from "react";
import ButtonBox from "./button-box";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   stackSize : props.startingStack,
    // }
  }

  render() {
    return (
      <div>
        <ButtonBox/>
      </div>
    )
  }
}

export default GameContainer;
