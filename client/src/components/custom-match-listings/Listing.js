import React from 'react';
import { connect } from "react-redux";
import {joinMatch} from "../../js/custom-match-listings";
import {changeStoreState} from '../../actions/index';
import './Listing.css';

function mapDispatchToProps(dispatch) {
  return {
    changeStoreState: article => dispatch(changeStoreState(article))
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

  clickLogic() {
    const {matchId} = this.props;
    this.props.changeStoreState({ selectedCustomMatchId: matchId });
  }


  render() {
    const {name, numPlayers, matchId, selectedCustomMatchId} = this.props;
    if (matchId === selectedCustomMatchId) {
      return (
        <div className = 'SelectedCustomListing' onClick = {() => {this.clickLogic();}}>
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
