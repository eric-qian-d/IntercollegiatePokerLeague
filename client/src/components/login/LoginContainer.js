import React from "react";
import LoginForm from "./LoginForm";
import ToRegistrationButton from "./ToRegistrationButton";
import vars from '../../vars';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/loggedin');
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/loggedin', {withCredentials: true, credentials: 'include'}, {
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
        <ToRegistrationButton {...this.props}/>
      </div>

    )
  }
}

export default LoginContainer;
