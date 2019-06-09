import React from 'react';

class RankedHUGameButton extends React.Component {
  clickLogic() {

  }

  render() {
    return (
      <button className = 'RankedHUGameButton' onClick = {() => {this.clickLogic()}}>
        Ranked HU Game
      </button>
    )

  }
}

export default RankedHUGameButton;
