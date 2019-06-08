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
    socket.on('MATCH STATUS', (status) => {
      this.setState({matchStatus: status});
    })
    this.state = {
      isOwner: false,
      matchStatus: '',
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit("IS OWNER");
    socket.emit('GET MATCH STATUS');
  }

  render() {
    const {socket} = this.props;
    const {isOwner, matchStatus} = this.state;
    if (matchStatus === 'creation') {
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
    } else if (matchStatus === 'in progress') {
      return (
        <div> in progress </div>
      )
    } else if (matchStatus === 'finished') {
      return (
        <div> match finished </div>
      )
    } else {
      return (
        <div> Loading </div>
      )
    }


  }
}

export default CustomMatchLobbyContainer;
