import React from 'react';
import { connect } from 'react-redux';

import vars from '../../vars';
import './PlayButton.css';

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
      this.props.history.push('/games')
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
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data);
          this.props.history.push('/games');
        } else {
          alert('Logout failed');
        }
      });
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
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.history.push('/games');
        } else {
          alert('Logout failed');
        }
      });
    }
  }

  render() {
    const {gameType} = this.props;
    if (gameType === 'none') {
      return (
        <button id = 'SelectGameTypeAndPlayButton' className = 'BackgroundDiv'>
          Choose Game
        </button>
      )
    } else {
      return (
        <button id = 'SelectGameTypeAndPlayButtonPlay' className = 'BackgroundDiv' onClick = {() => {this.clickLogic();}}>
          Play
        </button>
      )
    }
  }
}

const PlayButton = connect(mapStateToProps)(RawPlayButton);

export default PlayButton;
