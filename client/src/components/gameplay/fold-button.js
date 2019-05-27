import React from 'react';

import {fold} from "../../js/gameplay";


class FoldButton extends React.Component {
  render() {
    return (
      <button className = "FoldButton" onClick = {() => {fold()}}>
        {"Fold"}
      </button>
    )
  }
}

export default FoldButton;
