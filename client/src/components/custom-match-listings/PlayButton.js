import React from 'react';
import { connect } from "react-redux";

import vars from '../../vars';
import {joinMatch} from "../../js/custom-match-listings";
import './PlayButton.css';

function mapStateToProps(state) {
  console.log(state);
  return {
    selectedCustomMatchId: state.selectedCustomMatchId,
  }
}

class RawPlayButton extends React.Component {
  constructor(props) {
    super(props)
  }

  clickLogic() {
    const {socket, selectedCustomMatchId} = this.props;
    joinMatch(socket, selectedCustomMatchId);
  }

  render() {
    const {selectedCustomMatchId} = this.props;
    if (selectedCustomMatchId === 'none') {
      return (
        <button id = 'PlayGameButton'>
          Choose Game
        </button>
      )
    } else {
      return (
        <button id = 'PlayGameButton' className = 'CustomListingsButton' onClick = {() => {this.clickLogic();}}>
          Play
        </button>
      )
    }
  }
}

const PlayButton = connect(mapStateToProps)(RawPlayButton);

export default PlayButton;
