import React from 'react';

import Listing from "./listing";

class HUListingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    }
  }

  render() {
    console.log("in render");
    console.log(this.state.matches);
    var lines = this.state.matches.map(function (match, i) {
      return (
        <div key = {i}>
          {match}
        </div>
      )
    });
    console.log(lines);
    return (

      <div id = "LobbyWrapper">
        {lines}
      </div>
    );
  }


  componentDidMount() {
    this.props.socket.emit("GET HU MATCHES");
    this.props.socket.on("HU MATCHES", matchesList => {
      // var matchesList = data.split(/\n/);
      console.log(matchesList);
      var tempMatches = [];
      for(var i = 0; i < matchesList.length; i++) {
          var name =  matchesList[i].name;
          var numPlayers =  matchesList[i].numPlayers;
          var id = matchesList[i].id;
          tempMatches.push(<Listing name = {name} numPlayers = {numPlayers} socket = {this.props.socket} matchId = {id}/>);
        }
      this.setState({matches: tempMatches});
    })

    console.log(this.state.matches);
  }


}

export default HUListingContainer;
