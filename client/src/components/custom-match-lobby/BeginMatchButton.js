import React from "react";
import {startMatch} from "../../js/custom-match-lobby";

class BeginMatchButton extends React.Component {
  constructor(props) {
    super(props);
  }

  beginMatchLogic() {
    startMatch(this.props.socket);
  }

  render() {
    return(
      <div>
        <button onClick = {() => {this.beginMatchLogic()}}>
          Begin Match
        </button>
      </div>
    )
  }
}

export default BeginMatchButton;
