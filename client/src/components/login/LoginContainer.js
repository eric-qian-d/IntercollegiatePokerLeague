import React from "react";
import LoginForm from "./LoginForm";
import Helmet from 'react-helmet';
import vars from '../../vars';
import './LoginContainer.css';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/loggedin', {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        this.props.history.push("/games");
      }
    });
  }

  // <Helmet bodyAttributes={{style: 'background: url(/images/Login.jpg) no-repeat center center fixed !important; background-size: cover; margin: 0 !important; font-family: Roboto, sans-serif' }}/>

  render() {
    return (
      <div id = "LoginContainer">

        <LoginForm {...this.props}/>

      </div>

    )
  }
}

export default LoginContainer;
