import React from "react";
import './ToResetPasswordButton.css';

class ToResetPasswordButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id = 'ToResetPasswordButtonContainer'>
        <div id = 'ToResetPasswordButton' onClick = {() => {this.props.history.push("/send-password-reset");}}>
          Forgot Password?
        </div>
      </div>
    )
  }
}

export default ToResetPasswordButton;
