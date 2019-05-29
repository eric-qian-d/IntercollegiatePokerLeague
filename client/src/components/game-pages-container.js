import React from "react";
import GameContainer from "./gameplay/game-container";
import CustomMatchListingsContainer from "./hu-match-listing/container";
import LobbyContainer from "./hu-match-lobby/lobby-container";
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
      this.setState({page : "CUSTOM MATCH LOBBY"});
    });

    this.state = {
      socket : socket,
      page : "CUSTOM LISTINGS",
    }
  }

  render() {
    const {page, socket} = this.state;
    console.log(page);
    if (page === "CUSTOM LISTINGS") {
      return (
        <CustomMatchListingsContainer socket = {socket} />
      )
    } else if (page === "GAME") {
      return (
        <GameContainer socket = {socket} />
      )
    } else if (page === "CUSTOM MATCH LOBBY") {
      return (
        <LobbyContainer socket = {socket} />
      )
    }
  }

  // componentDidMount() {
  //   const {socket} = this.state;
  //
  // }

}

export default GamePagesContainer;
