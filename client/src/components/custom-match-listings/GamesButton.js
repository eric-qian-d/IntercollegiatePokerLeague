import React from 'react';
import './GamesButton.css';

class GamesButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button id = 'GamesButton' className = 'CustomListingsButton' onClick = {() => {this.props.history.push("/choose-game");}}>
        Back
      </button>
    )
  }
}

export default GamesButton;
