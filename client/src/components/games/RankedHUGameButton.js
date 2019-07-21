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
        <div id = 'RankedHUGameButtonSelected' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader DarkDiv'>
            Ranked Heads Up
          </div>
          <div className = 'ChooseGameTypeBody WhiteDiv'>
            Play against random opponent
          </div>
        </div>
      )
    } else {
      return (
        <div id = 'RankedHUGameButton' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader BackgroundDiv'>
            Ranked Heads Up
          </div>
          <div id = 'RankedHUGameButtonBody' className = 'ChooseGameTypeBody WhiteDiv'>
            Play against random opponent
          </div>
        </div>
      )
    }


  }
}

const RankedHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawRankedHUGameButton);

export default RankedHUGameButton;
