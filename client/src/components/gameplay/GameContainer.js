import React from "react";
import Table from "./Table";
import ButtonBox from "./ButtonBox";
import ReturnToLobbyButton from "./ReturnToLobbyButton";
import DefeatBanner from './DefeatBanner';
import VictoryBanner from './VictoryBanner';
import {surrender} from "../../js/gameplay";
import { connect } from "react-redux";
import {changeStoreState} from '../../actions/index';
import './GameContainer.css';

function mapDispatchToProps(dispatch) {
  return {
    changeStoreState: article => dispatch(changeStoreState(article))
  };
}

class RawGameContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("GAME STATE", (gameInfo) => {
      if (gameInfo !== null) {
        console.log('setting game state');
        this.setState({
          inGame: true,
          finished: gameInfo.finished,
          victory: gameInfo.victory,
          displaySurrender: gameInfo.displaySurrender
      });
        this.props.changeStoreState(gameInfo);
      }

    })
    socket.on('GAME TIME', (gameInfo) => {
      if (gameInfo !== null) {
        this.props.changeStoreState(gameInfo);
      }
    })
    socket.on('GAME ENDED', (victory) => {
      this.setState({ inGame: false, finished: true , victory: victory})
    })
    this.state = {
      inGame: false,
      finished: false,
      victory: false,
      displaySurrender: false
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    console.log('getting game state')
    socket.emit("GET GAME STATE");
  }

  surrenderLogic() {
    this.setState({displaySurrender: false});
    surrender(this.props.socket);
  }

  render() {
    const {numPlayers, buttonLocation, action, pot, board, time, players,
      maxTime, checkable, minBet, maxBet, smallBet, mediumBet, largeBet,
      smallBetText, mediumBetText, largeBetText, finished, victory, displaySurrender,
    inGame} = this.state;
    const {socket} = this.props;

    const surrenderBanner = displaySurrender ?
    <div id = 'SurrenderBanner' className = 'DarkDiv'>
      <div id = 'SurrenderBannerHeader'>
        Are you sure you want to surrender?
      </div>
      <button id = 'SubmitSurrenderButton' className = 'SurrenderBannerButton DarkDiv' onClick = {() => {this.surrenderLogic()}}>
        Yes
      </button>
      <button id = 'CancelSurrenderButton' className = 'SurrenderBannerButton DarkDiv' onClick = {() => {this.setState({displaySurrender: false}) }}>
        No
      </button>
    </div>
    :
    null;

    const buttonDisplay = inGame ?
    <button id = 'SurrenderButton' onClick = {() => {this.setState({displaySurrender: true})}}>
      Surrender
    </button>
    :
    <ReturnToLobbyButton socket = {socket} />

    return (
      <div id = 'GameContainer'>
        <Table/>
        <ButtonBox socket = {this.props.socket} checkable = {checkable}
          minBet = {minBet} maxBet = {maxBet} smallBet = {smallBet}
          mediumBet = {mediumBet} largeBet = {largeBet} smallBetText = {smallBetText}
          mediumBetText = {mediumBetText} largeBetText = {largeBetText} />


        {surrenderBanner}
        {buttonDisplay}


        <VictoryBanner display = {finished && victory} socket = {socket}/>
        <DefeatBanner display = {finished && !victory} socket = {socket}/>
      </div>
    )
  }
}

const GameContainer = connect(null, mapDispatchToProps)(RawGameContainer);
export default GameContainer;
