import React from "react";
import KickPlayerButton from './KickPlayerButton';
import './PlayerListing.css';

class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  //eventually should make props pass in something that's not just a name
  render() {
    const {playerName, status, renderKick, socket, playerId, ownerId} = this.props;
    if (renderKick && playerId !== ownerId) {
      return (
        <div className = 'CustomMatchPlayerListingContainer LightGreyDiv'>
          <div className = 'CustomMatchPlayerListingText'>
            {playerName}
          </div>
          <KickPlayerButton socket = {socket} playerId = {playerId}/>
        </div>
      )
    } else {
      return (
        <div className = 'CustomMatchPlayerListingContainer LightGreyDiv'>
          <div className = 'CustomMatchPlayerListingText'>
            {playerName}
          </div>
        </div>
      )
    }

  }
}

export default PlayerListing;
