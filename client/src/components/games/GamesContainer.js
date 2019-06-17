import React from 'react';
import CustomGamesButton from './CustomGamesButton';
import NormalHUGameButton from './NormalHUGameButton';
import RankedHUGameButton from './RankedHUGameButton';
import Navbar from '../navbar/Navbar';
import vars from '../../vars';

class GamesContainer extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div className = 'GamesContainer'>
        <Navbar {...this.props}/>
        <CustomGamesButton {...this.props} />
        <NormalHUGameButton {...this.props}/>
        <RankedHUGameButton {...this.props}/>
      </div>
    )

  }
}

export default GamesContainer;
