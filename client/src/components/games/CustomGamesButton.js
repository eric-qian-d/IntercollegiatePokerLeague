import React from 'react';
import './CustomGamesButton.css';

class CustomGamesButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button id = 'CustomGamesButton' className = 'ChooseGameTypeButton' onClick = {() => {this.props.history.push("/games");}}>
        Custom Match
      </button>
    )
  }
}

export default CustomGamesButton;
