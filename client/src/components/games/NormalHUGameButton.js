import React from 'react';
import { connect } from "react-redux";
import vars from '../../vars';
import {changeStoreState} from '../../actions/index';
import './NormalHUGameButton.css';

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

class RawNormalHUGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'NormalHUMatch',
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
        <div id = 'NormalHUGameButtonSelected' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader DarkDiv'>
            Normal
          </div>
          <div className = 'ChooseGameTypeBody WhiteDiv'>
            Play an unranked heads up match against a random opponent
          </div>
        </div>
      )
    } else {
      return (
        <div id = 'NormalHUGameButton' className = 'ChooseGameTypePanel' onClick = {() => {this.clickLogic()}}>
          <div className = 'ChooseGameTypeHeader BackgroundDiv'>
            Normal
          </div>
          <div className = 'ChooseGameTypeBody WhiteDiv'>
            Play an unranked heads up match against a random opponent
          </div>
        </div>
      )
    }


  }
}

const NormalHUGameButton = connect(mapStateToProps, mapDispatchToProps)(RawNormalHUGameButton);

export default NormalHUGameButton;
