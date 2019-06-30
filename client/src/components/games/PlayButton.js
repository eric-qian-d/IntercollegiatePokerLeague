import React from 'react';
import { connect } from "react-redux";

import vars from '../../vars';
import './CustomGamesButton.css';

function mapStateToProps(state) {
  return {
    gameType: state.gameType,
  }
}

class RawPlayButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'test',
    }
  }

  clickLogic() {
    const {gameType} = this.props;
    if (gameType === 'CustomMatch') {
      this.props.history.push("/games")
    } else if (gameType === 'NormalHUMatch') {
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/join-normal', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
        credentials : 'include',
        withCredentials : true,
      });
      this.props.history.push('/games');
    } else if (gameType === 'RankedHUGameButton') {
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/join-ranked', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
        credentials : 'include',
        withCredentials : true,
      })
      this.props.history.push('/games');
    }
  }

  render() {
    const {gameType} = this.props;
    if (gameType === 'none') {
      return (
        <button id = 'PlayGameButton'>
          Choose Game
        </button>
      )
    } else {
      return (
        <button id = 'PlayGameButton' onClick = {() => {this.clickLogic();}}>
          Play
        </button>
      )
    }
  }
}

const PlayButton = connect(mapStateToProps)(RawPlayButton);

export default PlayButton;
