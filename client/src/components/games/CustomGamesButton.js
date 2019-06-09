import React from 'react';

class CustomGamesButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className = 'CustomGamesButton' onClick = {() => {this.props.history.push("/games");}}>
        Custom Games
      </button>
    )
  }
}

export default CustomGamesButton;
