import React from "react";
import LoginForm from "./LoginForm";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://localhost:8081/login", {withCredentials: true, credentials: 'include'}, {
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
