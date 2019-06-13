import React from 'react';
import CustomGamesButton from './CustomGamesButton';
import NormalHUGameButton from './NormalHUGameButton';
import RankedHUGameButton from './RankedHUGameButton';
import Navbar from '../navbar/Navbar';

class GamesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://localhost:8081/loggedin", {withCredentials: true, credentials: 'include'}, {
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
        <Navbar />
        <CustomGamesButton {...this.props} />
        <NormalHUGameButton {...this.props}/>
        <RankedHUGameButton {...this.props}/>
      </div>
    )

  }
}

export default GamesContainer;
