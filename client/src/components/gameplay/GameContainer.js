import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("GAME STATE", (gameInfo, allPlayerInfo) => {
      console.log(gameInfo);
      console.log(allPlayerInfo);
    })
  }

  componentDidMount() {

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
