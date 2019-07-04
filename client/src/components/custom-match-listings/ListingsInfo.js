import React from 'react';
import './ListingsInfo.css';

class ListingsInfo extends React.Component {
  render() {
    return (
      <div id = 'CustomListingHeader'>
        <div className = 'CustomListingInfo CustomListingName'>
          Game Name
        </div>
        <div className = 'CustomListingInfo CustomListingOwnerName'>
          Owner
        </div>
        <div className = 'CustomListingInfo CustomListingNumPlayers'>
          Number of Players
        </div>
      </div>
    );
  }
}

export default ListingsInfo;
