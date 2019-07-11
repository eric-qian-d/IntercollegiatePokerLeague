import React from "react";
import './ToLoginButton.css';

class ToLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = 'ToLoginButtonContainer'>
        Already have an account?
        <button id = 'ToLoginButton' onClick = {() => {this.props.history.push("/login");}}>
          Login
        </button>
      </div>
    )
  }
}

export default ToLoginButton;
