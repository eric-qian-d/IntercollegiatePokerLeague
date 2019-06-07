import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("GAME STATE", (gameInfo, allPlayerInfo) => {
      this.setState({numPlayers: gameInfo[0], buttonLocation: gameInfo[1], action: gameInfo[2], pot: gameInfo[3], board: gameInfo[4], time: gameInfo[5], players: allPlayerInfo});
    })
    this.state = {
      numPlayers: 0,
      buttonLocation: 0,
      action: 0,
      pot: 0,
      board: [],
      players: [],
      time: 0,
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("GET GAME STATE");
  }

  render() {
    const {numPlayers, buttonLocation, action, pot, board, time, players} = this.state;
    return (
      <div>
        <Table numPlayers = {numPlayers} buttonLocation = {buttonLocation} action = {action} pot = {pot} board = {board} players = {players}/>
        <ButtonBox socket = {this.props.socket} />
        {time}
      </div>
    )
  }
}

export default GameContainer;
