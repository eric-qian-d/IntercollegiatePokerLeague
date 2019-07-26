import React from 'react';
import { connect } from "react-redux";
import vars from '../../vars';
import {changeStoreState} from '../../actions/index';
import './RankedHUGameButton.css';

function mapDispatchToProps(dispatch) {
  return {
    changeStoreState: article => dispatch(changeStoreState(article))
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
    this.props.changeStoreState({ gameType: test });
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <div id = 'RankedHUGameButtonSelected' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader DarkDiv'>
            Ranked
          </div>
          <div className = 'ChooseGameTypeBody WhiteDiv'>
            Play a ranked heads up match against a random opponent
          </div>
        </div>
      )
    } else {
      return (
        <div id = 'RankedHUGameButton' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader BackgroundDiv'>
            Ranked
          </div>
          <div id = 'RankedHUGameButtonBody' className = 'ChooseGameTypeBody WhiteDiv'>
            Play a ranked heads up match against a random opponent
          </div>
        </div>
      )
    }


  }
}

const RankedHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawRankedHUGameButton);

export default RankedHUGameButton;
