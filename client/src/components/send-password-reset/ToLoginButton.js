import React from "react";
import './ToLoginButton.css';

class ToLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = 'ToLoginButtonContainer'>
        <div id = 'ToLoginButton' onClick = {() => {this.props.history.push("/login");}}>
          I remembered my password!
        </div>
      </div>
    )
  }
}

export default ToLoginButton;
