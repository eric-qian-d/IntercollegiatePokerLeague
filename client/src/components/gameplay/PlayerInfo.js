import React from "react";

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, stackSize} = this.props;
    return (
      <div className = "PlayerInfoBox" >
        <div className = "PlayerName">
          name
        </div>
        <div className = "PlayerStackSize">
          stackSize
        </div>
      </div>
    )
  }
}
