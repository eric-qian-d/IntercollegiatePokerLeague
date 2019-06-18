import React from "react";
import LoginForm from "./LoginForm";

import vars from '../../vars';

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

  render() {
    return (
      <div className = "LoginContainer">
        <LoginForm {...this.props}/>

      </div>

    )
  }
}

export default LoginContainer;
