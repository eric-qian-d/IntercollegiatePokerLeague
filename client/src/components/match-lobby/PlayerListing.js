import React from "react";
import './PlayerListing.css';

//NOTE THAT THIS IS THE SAME AS THE PLAYER LISTING IN CUSTOM-MATCH-LOBBY
class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  //eventually should make props pass in something that's not just a name
  render() {
    const {player, status} = this.props;
    if (status === 'won') {
      return (

        <div  className = 'MatchResultPlayerListingContainer '>
          <img className = 'WinCrown' src = '/images/crown.png'/>
          <div className = 'MatchResultPlayerListing DarkDiv'>
            {player}
          </div>
        </div>
      )
    } else {
      return (

        <div className = 'MatchResultPlayerListingContainer'>
          <div className = 'MatchResultPlayerListing DarkDiv'>
            {player}
          </div>
        </div>
      )
    }

  }
}

export default PlayerListing;
