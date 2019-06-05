import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("GAME STATE", (gameInfo, allPlayerInfo) => {
      this.setState({numPlayers: gameInfo[0], buttonLocation: gameInfo[1], action: gameInfo[2], pot: gameInfo[3], players: allPlayerInfo});
    })
    this.state = {
      numPlayers: 0,
      buttonLocation: 0,
      action: 0,
      pot: 0,
      players: [],
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("GET GAME STATE");
  }

  render() {
    const {numPlayers, buttonLocation, action, pot, players} = this.state;
    return (
      <div>
        <Table numPlayers = {numPlayers}  action = {action} pot = {pot} players = {players}/>
        <ButtonBox socket = {this.props.socket} />
      </div>
    )
  }
}

export default GameContainer;
