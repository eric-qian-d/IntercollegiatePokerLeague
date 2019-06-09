import React from "react";
import ListingsContainer from "./ListingsContainer";
import NewMatchButton from "./NewMatchButton";
import GamesButton from './GamesButton';
// import {socket} from "../../js/socket";

class CustomMatchListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("JOIN FAILED", () => {
      alert("join failed");
    });
    socket.on("CREATE FAILED", () => {
      alert("create failed");
    })
  }
  render() {
    const {socket} = this.props;
    return(
      <div>
        <NewMatchButton socket = {socket}/>
        <GamesButton {...this.props} />
        <ListingsContainer socket = {socket}/>
      </div>
    )
  }
}

export default CustomMatchListingsContainer;
