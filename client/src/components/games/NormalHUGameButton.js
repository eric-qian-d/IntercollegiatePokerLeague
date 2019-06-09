import React from 'react';

class NormalHUGameButton extends React.Component {
  clickLogic() {

  }

  render() {
    return (
      <button className = 'NormalHUGameButton' onClick = {() => {this.clickLogic()}}>
        Normal HU Game
      </button>
    )

  }
}

export default NormalHUGameButton;
