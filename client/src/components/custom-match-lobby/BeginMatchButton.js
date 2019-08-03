import React from "react";
import {startMatch} from "../../js/custom-match-lobby";
import './BeginMatchButton.css';

class BeginMatchButton extends React.Component {
  constructor(props) {
    super(props);
  }

  beginMatchLogic() {
    startMatch(this.props.socket);
  }

  render() {
    return(
        <button id = 'BeginMatchButton' className = 'BackgroundDiv' onClick = {() => {this.beginMatchLogic()}}>
          Begin Match
        </button>
    )
  }
}

export default BeginMatchButton;
