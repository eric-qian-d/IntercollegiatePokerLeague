import React from "react";
import RegistrationForm from "./RegistrationForm";

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "RegistrationContainer">
        <RegistrationForm/>
      </div>
    )
  }

  componentDidMount() {
    //can change this to not share the same endpoint
    fetch("http://localhost:8081/login", {withCredentials: true, credentials: 'include'}, {
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
