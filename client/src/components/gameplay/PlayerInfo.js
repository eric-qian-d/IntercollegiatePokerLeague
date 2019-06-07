import React from "react";
import './PlayerInfo.css';

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, stackSize} = this.props;
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

export default PlayerInfo;
