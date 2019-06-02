import React from "react";

class ToLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Already have an account?
        <button onClick = {() => {this.props.history.push("/login");}}>
          Login
        </button>
      </div>
    )
  }
}

export default ToLoginButton;
