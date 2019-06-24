import React from 'react';
import {makeNewHUMatchRequest} from '../../js/custom-match-listings';

class NewMatchButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const {socket} = this.props;
    makeNewHUMatchRequest(socket);
  }

  render() {
    return (
      <button id = 'NewMatchButton' onClick = {() => {this.onClick();}}>
        New Match
      </button>
    )
  }
}

export default NewMatchButton;
