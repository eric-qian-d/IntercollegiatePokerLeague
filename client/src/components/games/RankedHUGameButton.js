import React from 'react';
import { connect } from "react-redux";
import vars from '../../vars';
import {changeGameType} from '../../actions/index';
import './RankedHUGameButton.css';

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
    const {test} = this.state;
    this.props.changeGameType({ gameType: test });
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <button id = 'RankedHUGameButtonSelected' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Ranked Heads Up
        </button>
      )
    } else {
      return (
        <button id = 'RankedHUGameButton' className = 'ChooseGameTypeButton BackgroundDiv' onClick = {() => {this.clickLogic()}}>
          Ranked Heads Up
        </button>
      )
    }


  }
}

const RankedHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawRankedHUGameButton);

export default RankedHUGameButton;
