import React from "react";
import ListingContainer from "./listing-container";
import NewMatchButton from "./new-match-button";
import {socket} from "../../js/hu-match-listings";

class HULobby extends React.Component {
  render() {
    return(
      <div>
        <NewMatchButton socket = {socket}/>
        <ListingContainer socket = {socket}/>
      </div>
    )
  }
}

export default HULobby;
