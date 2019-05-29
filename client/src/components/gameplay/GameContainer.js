import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table />
        <ButtonBox socket = {this.props.socket} />
      </div>
    )
  }
}

export default GameContainer;
