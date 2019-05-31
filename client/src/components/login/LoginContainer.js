import React from "react";
import LoginForm from "./LoginForm";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
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
