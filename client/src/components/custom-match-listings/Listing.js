import React from 'react';
import { connect } from "react-redux";

import {joinMatch} from "../../js/custom-match-listings";
import {changeGameType} from '../../actions/index';
import './Listing.css';

function mapDispatchToProps(dispatch) {
  return {
    changeGameType: article => dispatch(changeGameType(article))
  };
}

function mapStateToProps(state) {
  return {
    selectedCustomMatchId: state.selectedCustomMatchId,
  }
}

class RawListing extends React.Component {
  constructor(props) {
    super(props);
  }

  // joinMatchButtonLogic() {
  //   joinMatch(this.props.socket, this.props.matchId);
  // }

  clickLogic() {
    const {matchId} = this.props;
    console.log('clicked')
    this.props.changeGameType({ selectedCustomMatchId: matchId });
    //this.props.history.push("/games")
  }


  render() {
    const {name, numPlayers, matchId, selectedCustomMatchId} = this.props;
    if (matchId === selectedCustomMatchId) {
      return (
        <div className = 'CustomListing' onClick = {() => {this.clickLogic();}}>
          <div className = 'CustomListingInfo CustomListingName'>
            {this.props.name}
          </div>
          <div className = 'CustomListingInfo CustomListingOwnerName'>
            {this.props.ownerName}
          </div>
          <div className = 'CustomListingInfo CustomListingNumPlayers'>
            {this.props.numPlayers}
          </div>
          SELECTED

        </div>
      );
    } else {
      return (
        <div className = 'CustomListing' onClick = {() => {this.clickLogic();}}>
          <div className = 'CustomListingInfo CustomListingName'>
            {this.props.name}
          </div>
          <div className = 'CustomListingInfo CustomListingOwnerName'>
            {this.props.ownerName}
          </div>
          <div className = 'CustomListingInfo CustomListingNumPlayers'>
            {this.props.numPlayers}
          </div>
        </div>
      );
    }

  }

}

const Listing = connect(mapStateToProps, mapDispatchToProps)(RawListing);

export default Listing;
