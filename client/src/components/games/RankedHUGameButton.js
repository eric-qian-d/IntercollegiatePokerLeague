import React from 'react';
import { connect } from "react-redux";

import vars from '../../vars';
import {changeGameType} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    changeGameType: article => dispatch(changeGameType(article))
  };
}

function mapStateToProps(state) {
  return {
    gameType: state.gameType,
  }
}

class RawRankedHUGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'RankedHUGameButton'
    }
  }
  clickLogic() {
    //should redirect to /games when loading


    const {test} = this.state;
    this.props.changeGameType({ gameType: test });

    // fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/join-ranked', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.state),
    //   credentials : 'include',
    //   withCredentials : true,
    // })
    // this.props.history.push('/games');
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <button id = 'RankedHUGameButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Ranked Heads Up S
        </button>
      )
    } else {
      return (
        <button id = 'RankedHUGameButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Ranked Heads Up
        </button>
      )
    }


  }
}

const RankedHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawRankedHUGameButton);

export default RankedHUGameButton;
