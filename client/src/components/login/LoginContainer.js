import React from "react";
import LoginForm from "./LoginForm";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("login container mount here");
    fetch("http://localhost:8081/login", {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.loggedIn) {
        console.log(this.props);
        // return <Redirect to='/games' />
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
