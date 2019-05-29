import React from 'react';
import {joinMatch} from "../../js/custom-match-listings";
import { Redirect } from 'react-router-dom'

class Listing extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: props.name,
    //   numPlayers: props.numPlayers,
    // }
  }

  joinMatchButtonLogic() {
    console.log("we are pressed");
    joinMatch(this.props.socket, this.props.matchId);
    // var endPoint = "/game".concat(this.props.matchId);
    console.log("/match/" + this.props.matchId);
    // return <Redirect to= {"/match/" + this.props.matchId} />
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
