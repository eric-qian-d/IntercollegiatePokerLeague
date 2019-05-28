import React from 'react';

import CallButton from "./call-button";
import FoldButton from "./fold-button";
import RaiseButton from "./raise-button";

class ButtonBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "ButtonBox">
        <div className = "CallButtonDiv">
          <CallButton  socket = {this.props.socket}/>
        </div>
        <div className = "FoldButtonDiv">
          <FoldButton socket = {this.props.socket}/>
        </div>
        <div className = "RaiseButtonDiv">
          <RaiseButton socket = {this.props.socket}/>
        </div>
      </div>

    )
  }
}

export default ButtonBox;
