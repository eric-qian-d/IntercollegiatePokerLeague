import React from 'react';
import './VictoryBanner.css';
import {lobby} from "../../js/gameplay";

class VictoryBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {display} = this.props;
    if (display) {
      return (
        <div id = 'VictoryBanner'>
          <div id = 'VictoryBannerHeader'>
            Victory
          </div>
          <button id = 'VictoryButton' onClick = {() => {lobby(this.props.socket)}}>
            Continue
          </button>
        </div>
      )
    } else {
      return (null);
    }
  }
}

export default VictoryBanner;
