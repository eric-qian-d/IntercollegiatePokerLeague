import React from 'react';
import ChooseGameTypeButtonContainer from './ChooseGameTypeButtonContainer';
import Navbar from '../navbar/Navbar';
import vars from '../../vars';

class GamesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/loggedin', {withCredentials: true, credentials: 'include'}, {
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
        <ChooseGameTypeButtonContainer {...this.props}/>
      </div>
    )

  }
}

export default GamesContainer;
