import React from 'react';
import {returnToHome} from "../../js/match-lobby";

class ReturnToHomeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const {socket, history} = this.props;
    returnToHome(socket);
    history.push('/');
  }

  render() {
    return (
      <button className = 'ReturnToHomeButton' onClick = {() => {this.onClick()}}>
        Return to Home
      </button>
    )
  }
}

export default ReturnToHomeButton;
