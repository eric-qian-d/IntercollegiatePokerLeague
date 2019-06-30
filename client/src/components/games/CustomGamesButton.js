import React from 'react';
import { connect } from "react-redux";

import './CustomGamesButton.css';
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


class RawCustomGamesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test : 'CustomMatch',
    }
  }

  clickLogic() {
    const {test} = this.state;
    this.props.changeGameType({ gameType: test });
    //this.props.history.push("/games")
  }

  render() {
    const {gameType} = this.props;
    if (gameType === this.state.test) {
      return (
        <button id = 'CustomGamesButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic();}}>
          Custom Match S
        </button>
      )
    } else {
      return (
        <button id = 'CustomGamesButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic();}}>
          Custom Match
        </button>
      )
    }


  }
}

const CustomGamesButton = connect(mapStateToProps, mapDispatchToProps)(RawCustomGamesButton);

export default CustomGamesButton;
