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
    });
    socket.on('MATCH OWNER', (ownerName, ownerId) => {
      this.setState({
        ownerName : ownerName,
        ownerId:  ownerId,
      })
    })
    this.state = {
      isOwner: false,
      ownerName : '',
      ownerId : '',
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit('IS OWNER');
    socket.emit('MATCH OWNER');

  }

  render() {
    const {socket} = this.props;
    const {isOwner, matchStatus, ownerId} = this.state;
    // if (matchStatus === 'creation') {
      if (isOwner) {
        return (
          <div>
            <TeamsContainer socket = {socket} isOwner = {isOwner} ownerId = {ownerId}/>
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
    // }



  }
}

export default CustomMatchLobbyContainer;
