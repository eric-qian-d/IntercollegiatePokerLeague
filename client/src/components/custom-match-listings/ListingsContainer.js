import React from 'react';
import Listing from "./Listing";
import ListingsInfo from './ListingsInfo';
import './ListingsContainer.css';

class ListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    }
  }

  render() {
    var lines = this.state.matches;
    return (
      <div id = "ListingsContainer">
        <ListingsInfo/>
        {lines}
      </div>
    );
  }


  componentDidMount() {
    this.props.socket.emit("GET CUSTOM MATCHES");
    this.props.socket.on("CUSTOM MATCHES", matchesList => {
      var tempMatches = [];
      for(var i = 0; i < matchesList.length; i++) {
          var name =  matchesList[i].name;
          var numPlayers =  matchesList[i].numPlayers;
          var id = matchesList[i].id;
          var ownerName = matchesList[i].ownerName;
          tempMatches.push(<Listing name = {name} numPlayers = {numPlayers} socket = {this.props.socket} matchId = {id} ownerName = {ownerName}/>);
        }
      this.setState({matches: tempMatches});
    })
  }


}

export default ListingsContainer;
