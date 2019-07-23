import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";
import ReturnToLobbyButton from "./ReturnToLobbyButton";
import { connect } from "react-redux";
import {changeGameType} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    changeGameType: article => dispatch(changeGameType(article))
  };
}

class RawGameContainer extends React.Component {
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
        minBet: gameInfo.minBet,
        maxBet: gameInfo.maxBet,
        smallBet: gameInfo.smallBet,
        mediumBet: gameInfo.mediumBet,
        largeBet: gameInfo.largeBet,
        smallBetText: gameInfo.smallBetText,
        mediumBetText: gameInfo.mediumBetText,
        largeBetText: gameInfo.largeBetText,
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
      minBet: 0,
      maxBet: 0,
      smallBet: 0,
      mediumBet: 0,
      largeBet: 0,
      smallBetText: '1/2 Pot',
      mediumBetText: '2/3 Pot',
      largeBetText: 'Pot'
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("GET GAME STATE");
  }

  render() {
    const {numPlayers, buttonLocation, action, pot, board, time, players,
      maxTime, checkable, minBet, maxBet, smallBet, mediumBet, largeBet,
      smallBetText, mediumBetText, largeBetText} = this.state;
    return (
      <div>
        <Table numPlayers = {numPlayers} buttonLocation = {buttonLocation}
          action = {action} pot = {pot} board = {board} players = {players}
          time = {time} maxTime = {maxTime}/>
        <ButtonBox socket = {this.props.socket} checkable = {checkable}
          minBet = {minBet} maxBet = {maxBet} smallBet = {smallBet}
          mediumBet = {mediumBet} largeBet = {largeBet} smallBetText = {smallBetText}
          mediumBetText = {mediumBetText} largeBetText = {largeBetText} />
        <ReturnToLobbyButton socket = {this.props.socket} />
      </div>
    )
  }
}

const GameContainer = connect(null, mapDispatchToProps)(RawGameContainer);
export default GameContainer;
