import React from "react";
import KickPlayerButton from './KickPlayerButton';

class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  //eventually should make props pass in something that's not just a name
  render() {
    const {playerName, status, renderKick, socket, playerId, ownerId} = this.props;
    const statusColorMap = {
      'lobby': 'black',
      'in progress': 'yellow',
      'won': 'green',
      'lost': 'red',
    }
    const style = {
      borderStyle: 'solid',
      borderWidth: '3px',
      width: '200px',
    }
    style.borderColor = statusColorMap[status];
    if (renderKick && playerId !== ownerId) {
      return (
        <div style = {style}>
          {playerName}
          <KickPlayerButton socket = {socket} playerId = {playerId}/>
        </div>
      )
    } else {
      return (
        <div style = {style}>
          {playerName}
        </div>
      )
    }

  }
}

export default PlayerListing;
