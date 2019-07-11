import React from "react";
import './ToRegistrationButton.css';

class ToRegistrationButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = 'ToRegistrationContainer'>
        Don't have an account yet?
        <button id = 'ToRegistrationButton' onClick = {() => {this.props.history.push("/registration");}}>
          Register
        </button>
      </div>
    )
  }
}

export default ToRegistrationButton;
