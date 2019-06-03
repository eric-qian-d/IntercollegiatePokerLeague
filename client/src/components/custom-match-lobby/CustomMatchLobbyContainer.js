import React from "react";
import TeamsContainer from "./TeamsContainer";
import BeginMatchButton from "./BeginMatchButton";
import ReturnToListingsButton from "./ReturnToListingsButton";

class CustomMatchLobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    const {socket} = this.props;
    socket.on("IS OWNER", isOwner => {
      this.setState({isOwner: isOwner});
    })
    this.state = {
      isOwner: false
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("IS OWNER");
  }

  render() {
    const {socket} = this.props;
    const {isOwner} = this.state;
    if (isOwner) {
      return (
        <div>
          <TeamsContainer socket = {socket} isOwner = {isOwner}/>
          <BeginMatchButton socket = {socket} isOwner = {isOwner}/>
          <ReturnToListingsButton socket = {socket} isOwner = {isOwner}/>
        </div>
      )
    } else {
      return (
        <div>
          <TeamsContainer socket = {socket} isOwner = {isOwner}/>
          <ReturnToListingsButton socket = {socket} isOwner = {isOwner}/>
        </div>
      )
    }

  }
}

export default CustomMatchLobbyContainer;
