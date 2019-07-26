import React from 'react';
import GameContainer from './gameplay/GameContainer';
import CustomMatchListingsContainer from './custom-match-listings/CustomMatchListingsContainer';
import CustomMatchLobbyContainer from './custom-match-lobby/CustomMatchLobbyContainer';
import QueueContainer from './queue/QueueContainer';
import MatchLobbyContainer from './match-lobby/MatchLobbyContainer';
import MatchCreationPageContainer from './new-match/MatchCreationPageContainer';
import {makeSocket} from '../js/socket';
import vars from '../vars';
import constants from '../constants';

class GamePagesContainer extends React.Component {
  constructor(props) {
    super(props);
    const socket = makeSocket();
    socket.on('PAGE', (page) => {
      this.setState({page : page});
    });
    socket.emit('WHICH PAGE');

    this.state = {
      socket : socket,
      page : null,
    }
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/loggedin', {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (!data.loggedIn) {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    const {page, socket, matchId} = this.state;
    if (page === constants.userLocation.CUSTOM_LISTINGS) {
      return (
        <CustomMatchListingsContainer socket = {socket} {...this.props}/>
      )
    } else if (page === constants.userLocation.GAME) {
      return (
        <GameContainer socket = {socket} />
      )
    } else if (page === constants.userLocation.CUSTOM_MATCH_LOBBY) {
      return (
        <CustomMatchLobbyContainer socket = {socket}/>
      )
    } else if (page === constants.userLocation.QUEUE) {
      return (
        <QueueContainer socket = {socket} {...this.props} />
      )
    } else if (page === constants.userLocation.MATCH_LOBBY) {
      return (
        <MatchLobbyContainer socket = {socket} {...this.props}/>
      )
    } else if (page === constants.userLocation.MATCH_CREATION){
      return (
        <MatchCreationPageContainer socket = {socket} />
      )
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }

}

export default GamePagesContainer;
