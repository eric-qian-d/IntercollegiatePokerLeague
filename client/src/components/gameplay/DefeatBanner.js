import React from 'react';
import './DefeatBanner.css';

class DefeatBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {display} = this.props;
    if (display) {
      return (
        <div id = 'DefeatBanner'>
          Defeat
        </div>
      )
    } else {
      return (null);
    }

  }
}

export default DefeatBanner;
