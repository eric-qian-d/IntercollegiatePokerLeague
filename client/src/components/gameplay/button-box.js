import React from 'react';

import CallButton from "./call-button";

class ButtonBox extends React.Component {
  render() {
    return (
      <div className = "ButtonBox">
        <div className = "CallButtonDiv">
          <CallButton />
        </div>
      </div>
    )
  }
}

export default ButtonBox;
