import React from 'react';
import {playerSocket} from "../../js/gameplay";
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

  // getMatches() {
  //   playerSocket.on("HU MATCHES", matchesList => {
  //     console.log(matchesList);
  //     // this.props.matches = [];
  //     // var matchesList = data.split(/\n/);
  //     for(var i = 0; i < matchesList.length; i++) {
  //         var name =  matchesList[i][0];
  //         var numPlayers =  matchesList[i][1];
  //       // };
  //       this.props.matches.push(<Listing name = {name} numPlayers = {numPlayers}/>);
  //     }
  //   })
  // }





  componentDidMount() {
    playerSocket.emit("GET HU MATCHES");
    playerSocket.on("HU MATCHES", matchesList => {
      // var matchesList = data.split(/\n/);
      console.log(matchesList);
      var tempMatches = [];
      for(var i = 0; i < matchesList.length; i++) {
          // matchProps = {
            var name =  matchesList[i].name;
            var numPlayers =  matchesList[i].numPlayers;
          // };
          tempMatches.push(<Listing name = {name} numPlayers = {numPlayers}/>);
        }
      this.setState({matches: tempMatches});
    })

    console.log(this.state.matches);
  }


}

export default HUListingContainer;
