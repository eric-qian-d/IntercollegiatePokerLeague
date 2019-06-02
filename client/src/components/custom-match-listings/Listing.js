import React from 'react';
import {joinMatch} from "../../js/custom-match-listings";
import { Redirect } from 'react-router-dom'

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  joinMatchButtonLogic() {
    joinMatch(this.props.socket, this.props.matchId);
  }


  render() {
    return (
      <div>
        {this.props.name}
        {this.props.numPlayers}
        <button className = "JoinMatchButton" onClick = {() => {this.joinMatchButtonLogic()}}>
          {"Join"}
        </button>

      </div>
    );
  }
}

export default Listing;
