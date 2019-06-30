import React from 'react';

class ListingsInfo extends React.Component {
  render() {
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
  }
}

export default ListingsInfo;
