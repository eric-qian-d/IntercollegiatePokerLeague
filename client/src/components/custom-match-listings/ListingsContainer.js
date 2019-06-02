import React from 'react';
import Listing from "./Listing";

class ListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    }
  }

  render() {
    var lines = this.state.matches.map(function (match, i) {
      return (
        <div key = {i}>
          {match}
        </div>
      )
    });
    return (

      <div id = "LobbyWrapper">
        {lines}
      </div>
    );
  }


  componentDidMount() {
    console.log("Listings Container is mounting");
    this.props.socket.emit("GET CUSTOM MATCHES");
    this.props.socket.on("CUSTOM MATCHES", matchesList => {
      var tempMatches = [];
      for(var i = 0; i < matchesList.length; i++) {
          var name =  matchesList[i].name;
          var numPlayers =  matchesList[i].numPlayers;
          var id = matchesList[i].id;
          tempMatches.push(<Listing name = {name} numPlayers = {numPlayers} socket = {this.props.socket} matchId = {id}/>);
        }
      this.setState({matches: tempMatches});
    })
  }


}

export default ListingsContainer;
