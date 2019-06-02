import React from "react";

class ToRegistrationButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Don't have an account yet?
        <button onClick = {() => {this.props.history.push("/registration");}}>
          Register
        </button>
      </div>
    )
  }
}

export default ToRegistrationButton;
