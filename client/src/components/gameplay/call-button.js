import React from 'react';

import {call} from "../../js/gameplay";


class CallButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket = props.socket;
    }
  }
  render() {
    return (
      <button className = "CallButton" onClick = {() => {call(this.state.socket)}}>
        {"Call"}
      </button>
    )
  }
}

export default CallButton;
