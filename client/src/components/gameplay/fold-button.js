import React from 'react';

import {fold} from "../../js/gameplay";


class FoldButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className = "FoldButton" onClick = {() => {fold(this.props.socket)}}>
        {"Fold"}
      </button>
    )
  }
}

export default FoldButton;
