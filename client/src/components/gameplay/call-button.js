import React from 'react';

import {call} from "../../js/gameplay";


class CallButton extends React.Component {
  render() {
    return (
      <button className = "CallButton" onClick = {() => {call()}}>
        {"Call"}
      </button>
    )
  }
}

export default CallButton;
