import React from "react";
import GameContainer from "./gameplay/GameContainer";
import CustomMatchListingsContainer from "./custom-match-listings/CustomMatchListingsContainer";
import CustomMatchLobbyContainer from "./custom-match-lobby/CustomMatchLobbyContainer";
import {makeSocket} from "../js/socket";

class GamePagesContainer extends React.Component {
  constructor(props) {
    super(props);
    const socket = makeSocket();
    socket.on("CUSTOM LISTINGS", () => {
      this.setState({page : "CUSTOM LISTINGS"});
    });
    socket.on("GAME", () => {
      this.setState({page : "GAME"});
    });
    socket.on("CUSTOM MATCH LOBBY", () => {
      this.setState({
        page : "CUSTOM MATCH LOBBY",
      });
    });
    socket.emit("WHICH PAGE");

    this.state = {
      socket : socket,
      page : null,
    }
  }

  render() {
    const {page, socket, matchId} = this.state;
    console.log(page);
    if (page === "CUSTOM LISTINGS") {
      return (
        <CustomMatchListingsContainer socket = {socket} {...this.props}/>
      )
    } else if (page === "GAME") {
      return (
        <GameContainer socket = {socket} />
      )
    } else if (page === "CUSTOM MATCH LOBBY") {
      return (
        <CustomMatchLobbyContainer socket = {socket}/>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }

  // componentDidMount() {
  //   const {socket} = this.state;
  //
  //
  // }

}

export default GamePagesContainer;
