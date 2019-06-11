import React from 'react';

class NormalHUGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }
  clickLogic() {
    //should redirect to /games when loading
    fetch("http://localhost:8081/api/choose-game/join-normal", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
      credentials : 'include',
      withCredentials : true,
    });
    this.props.history.push('/games');
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
