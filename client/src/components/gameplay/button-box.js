import React from 'react';

import CallButton from "./call-button";
import FoldButton from "./fold-button";
import RaiseButton from "./raise-button";

class ButtonBox extends React.Component {
  render() {
    return (
      <div className = "ButtonBox">
        <div className = "CallButtonDiv">
          <CallButton />
        </div>
        <div className = "FoldButtonDiv">
          <FoldButton />
        </div>
        <div className = "RaiseButtonDiv">
          <RaiseButton />
        </div>
      </div>

    )
  }
}

export default ButtonBox;
