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
        <button className = "CallButton" onClick = {() => {call(this.props.socket)}}>
          {"Call"}
        </button>
      )
    } else {
      return (
        <button className = "CheckButton" onClick = {() => {call(this.props.socket)}}>
          {"Check"}
        </button>
      )
    }

  }
}

export default CallButton;
