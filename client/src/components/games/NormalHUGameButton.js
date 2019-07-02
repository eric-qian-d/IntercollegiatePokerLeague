import React from 'react';
import { connect } from "react-redux";
import vars from '../../vars';
import {changeGameType} from '../../actions/index';
import './NormalHUGameButton.css';

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
    const {test} = this.state;
    this.props.changeGameType({ gameType: test });
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <button id = 'NormalHUGameButtonSelected' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
          Normal Heads Up
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
