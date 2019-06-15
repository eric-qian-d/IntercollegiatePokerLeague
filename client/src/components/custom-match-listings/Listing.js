import React from 'react';
import {joinMatch} from "../../js/custom-match-listings";
import './Listing.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  joinMatchButtonLogic() {
    joinMatch(this.props.socket, this.props.matchId);
  }


  render() {
    const {name, numPlayers, header} = this.props;
    if (header) {
      return (
        <div className = 'CustomListing'>
          <div className = 'CustomListingInfo CustomListingName'>
            Game Name
          </div>
          <div className = 'CustomListingInfo CustomListingOwnerName'>
            Owner
          </div>
          <div className = 'CustomListingInfo CustomListingNumPlayers'>
            Number of Players
          </div>
          <div className = 'JoinMatchButton'>
          </div>
        </div>
      );
    } else {
      return (
        <div className = 'CustomListing'>
          <div className = 'CustomListingInfo CustomListingName'>
            {this.props.name}
          </div>
          <div className = 'CustomListingInfo CustomListingOwnerName'>
            {this.props.ownerName}
          </div>
          <div className = 'CustomListingInfo CustomListingNumPlayers'>
            {this.props.numPlayers}
          </div>
          <button className = "JoinMatchButton" onClick = {() => {this.joinMatchButtonLogic()}}>
            {"Join"}
          </button>

        </div>
      );
    }

  }
}

export default Listing;
