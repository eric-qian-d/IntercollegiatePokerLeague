import React from "react";
import ListingsContainer from "./ListingsContainer";
import NewMatchButton from "./NewMatchButton";
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
        <ListingsContainer socket = {socket}/>
      </div>
    )
  }
}

export default CustomMatchListingsContainer;
