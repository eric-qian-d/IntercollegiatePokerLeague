import React from 'react';
import ChooseGameTypeButtonContainer from './ChooseGameTypeButtonContainer';
import PlayButton from './PlayButton';
import Navbar from '../navbar/Navbar';
import Helmet from 'react-helmet';
import vars from '../../vars';
import './GamesContainer.css';

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
      <div id = 'GamesContainer' className = 'MediumDiv'>
        <Navbar {...this.props}/>
        <div id = 'ChooseGameHeader'>
          Game Type
        </div>
        <ChooseGameTypeButtonContainer {...this.props}/>
        <PlayButton {...this.props} />
      </div>
    )

  }
}

export default GamesContainer;
