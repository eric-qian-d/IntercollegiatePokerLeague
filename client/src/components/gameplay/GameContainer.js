import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";
import ReturnToLobbyButton from "./ReturnToLobbyButton";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("GAME STATE", (gameInfo, allPlayerInfo) => {
      this.setState({
        numPlayers: gameInfo.numPlayers,
        buttonLocation: gameInfo.buttonLocation,
        action: gameInfo.action,
        pot: gameInfo.pot,
        board: gameInfo.board,
        time: gameInfo.time,
        maxTime: gameInfo.maxTime,
        checkable: gameInfo.checkable,
        players: allPlayerInfo,
      });
    })
    socket.on("MATCH ENDED", () => {
      this.setState({finish: true});
    })
    this.state = {
      numPlayers: 0,
      buttonLocation: 0,
      action: 0,
      pot: 0,
      board: [],
      players: [],
      time: 0,
      finished: false,
      maxTime: 0,
      checkable: 0,
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("GET GAME STATE");
  }

  render() {
    const {numPlayers, buttonLocation, action, pot, board, time, players, maxTime, checkable} = this.state;
    return (
      <div>
        <Table numPlayers = {numPlayers} buttonLocation = {buttonLocation} action = {action} pot = {pot} board = {board} players = {players} time = {time} maxTime = {maxTime}/>
        <ButtonBox socket = {this.props.socket} checkable = {checkable}/>
        <ReturnToLobbyButton socket = {this.props.socket} />
      </div>
    )
  }
}

export default GameContainer;
