import React from "react";
import TimeBar from './TimeBar';
import './PlayerInfo.css';

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, stackSize, action, time, maxTime} = this.props;
    if (action) {
      const style = {
        'height': `5px`,
        'width': 120 * time/maxTime + 'px',
        'position': `absolute`,
        'border': '2px solid black'
      };

      return (
        <div className = "PlayerInfo" >
          <div className = "PlayerName">
            {name}
          </div>
          <div className = "PlayerStackSize">
            {stackSize}
          </div>
          <div style = {style}>
          </div>
        </div>
      )
    } else {
      return (
        <div className = "PlayerInfo" >
          <div className = "PlayerName">
            {name}
          </div>
          <div className = "PlayerStackSize">
            {stackSize}
          </div>
        </div>
      )
    }

  }
}

export default PlayerInfo;
