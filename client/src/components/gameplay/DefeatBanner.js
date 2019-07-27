import React from 'react';
import './DefeatBanner.css';
import {lobby} from "../../js/gameplay";

class DefeatBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {display} = this.props;
    if (display) {
      return (
        <div id = 'DefeatBanner'>
          <div id = 'DefeatBannerHeader'>
            Defeat
          </div>
          <button id = 'DefeatButton' onClick = {() => {lobby(this.props.socket)}}>
            Continue
          </button>
        </div>
      )
    } else {
      return (null);
    }

  }
}

export default DefeatBanner;
