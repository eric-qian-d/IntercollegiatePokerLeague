import React from "react";
import RegistrationForm from "./RegistrationForm";
import ToLoginButton from "./ToLoginButton";
import vars from '../../vars';

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "RegistrationContainer">
        <RegistrationForm/>
        <ToLoginButton {...this.props}/>
      </div>
    )
  }

  componentDidMount() {
    //can change this to not share the same endpoint
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/loggedin', {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        this.props.history.push("/games");
      }
    });
  }
}

export default RegistrationContainer
