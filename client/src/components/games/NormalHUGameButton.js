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
  console.log(state.gameType);
  return {
    gameType: state.gameType,
  }
}

class RawNormalHUGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'NormalHUMatch',
    }
  }

  clickLogic() {
    //should redirect to /games when loading
    const {test} = this.state;
    this.props.changeGameType({ gameType: test });
    // fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/join-normal', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.state),
    //   credentials : 'include',
    //   withCredentials : true,
    // });
    // this.props.history.push('/games');
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <button id = 'NormalHUGameButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Normal Heads Up S
        </button>
      )
    } else {
      return (
        <button id = 'NormalHUGameButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Normal Heads Up
        </button>
      )
    }


  }
}

const NormalHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawNormalHUGameButton);

export default NormalHUGameButton;
