import React from 'react';

import {call} from "../../js/gameplay";


class CallButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {checkable} = this.props;
    if (!checkable) {
      return (
        <button id = "CallButton" className = 'ActionButton BackgroundDiv' onClick = {() => {call(this.props.socket)}}>
          {"Call"}
        </button>
      )
    } else {
      return (
        <button id = "CheckButton" className = 'ActionButton BackgroundDiv' onClick = {() => {call(this.props.socket)}}>
          {"Check"}
        </button>
      )
    }

  }
}

export default CallButton;
