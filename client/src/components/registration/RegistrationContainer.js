import React from "react";
import RegistrationForm from "./RegistrationForm";
import ToLoginButton from "./ToLoginButton";

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
    fetch("http://localhost:8081/loggedin", {withCredentials: true, credentials: 'include'}, {
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
