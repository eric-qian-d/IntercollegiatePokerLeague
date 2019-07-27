import React from 'react';
import './VictoryBanner.css'

class VictoryBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {display} = this.props;
    if (display) {
      return (
        <div id = 'VictoryBanner'>
          Victory
        </div>
      )
    } else {
      return (null);
    }
  }
}

export default VictoryBanner;
