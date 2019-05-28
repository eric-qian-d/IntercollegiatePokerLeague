import React from "react";
import ListingContainer from "./listing-container";
import NewMatchButton from "./new-match-button";

class HULobby extends React.Component {
  render() {
    return(
      <div>
        <NewMatchButton/>
        <ListingContainer/>
      </div>
    )
  }
}

export default HULobby;
