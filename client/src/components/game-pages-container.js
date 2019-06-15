import React from "react";
import GameContainer from "./gameplay/GameContainer";
import CustomMatchListingsContainer from "./custom-match-listings/CustomMatchListingsContainer";
import CustomMatchLobbyContainer from "./custom-match-lobby/CustomMatchLobbyContainer";
import QueueContainer from './queue/QueueContainer';
import MatchLobbyContainer from './match-lobby/MatchLobbyContainer';
import {makeSocket} from "../js/socket";
import vars from '../vars';

class GamePagesContainer extends React.Component {
  constructor(props) {
    super(props);
    const socket = makeSocket();
    socket.on("PAGE: CUSTOM LISTINGS", () => {
      this.setState({page : "CUSTOM LISTINGS"});
    });
    socket.on("PAGE: GAME", () => {
      this.setState({page : "GAME"});
    });
    socket.on("PAGE: CUSTOM MATCH LOBBY", () => {
      this.setState({
        page : "CUSTOM MATCH LOBBY",
      });
    });
    socket.on('PAGE: IN QUEUE', () => {
      this.setState({
        page: 'IN QUEUE',
      })
    })
    socket.on('PAGE: MATCH LOBBY', () => {
      this.setState({
        page: 'MATCH LOBBY',
      })
    })
    socket.emit("WHICH PAGE");

    this.state = {
      socket : socket,
      page : null,
    }
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/loggedin', {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (!data.loggedIn) {
        this.props.history.push("/login");
      }
    });
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
    } else if (page === 'IN QUEUE') {
      return (
        <QueueContainer socket = {socket} {...this.props} />
      )
    } else if (page === 'MATCH LOBBY') {
      return (
        <MatchLobbyContainer socket = {socket} {...this.props}/>
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
