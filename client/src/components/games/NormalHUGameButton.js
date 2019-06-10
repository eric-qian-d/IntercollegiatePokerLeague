import React from 'react';

class NormalHUGameButton extends React.Component {
  clickLogic() {
    //should redirect to /games when loading
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
