import React from "react";
import ListingsContainer from "./ListingsContainer";
import './CustomMatchListingsContainer.css';


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
      <div id = 'CustomMatchListingsContainer'>

        <ListingsContainer socket = {socket} {...this.props}/>


      </div>
    )
  }
}

export default CustomMatchListingsContainer;
