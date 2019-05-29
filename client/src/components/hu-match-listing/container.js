import React from "react";
import ListingContainer from "./listing-container";
import NewMatchButton from "./new-match-button";
// import {socket} from "../../js/socket";

class CustomMatchListingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {socket} = this.props;
    return(
      <div>
        <NewMatchButton socket = {socket}/>
        <ListingContainer socket = {socket}/>
      </div>
    )
  }
}

export default CustomMatchListingsContainer;
