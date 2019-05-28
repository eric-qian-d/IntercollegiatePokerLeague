import React from 'react';

import {fold} from "../../js/gameplay";


class FoldButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket = props.socket;
    }
  }

  render() {
    return (
      <button className = "FoldButton" onClick = {() => {fold(this.state.socket)}}>
        {"Fold"}
      </button>
    )
  }
}

export default FoldButton;
