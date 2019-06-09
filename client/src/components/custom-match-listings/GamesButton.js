import React from 'react';

class GamesButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className = 'GamesButton' onClick = {() => {this.props.history.push("/choose-game");}}>
        Back to Game Choices
      </button>
    )
  }
}

export default GamesButton;
