import React from 'react';
import { connect } from "react-redux";

import {changeRequestedLeaderboard} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    changeRequestedLeaderboard: leaderBoardType => dispatch(changeRequestedLeaderboard(leaderBoardType))
  };
}


class RawIndividualsHUButton extends React.Component {
  constructor(props) {
    super(props);
  }

  clickLogic() {
    this.props.changeRequestedLeaderboard('hu-individual-leaderboard');
  }

  render() {
    return (
      <button id = 'IndividualsHUButton' onClick = {() => {this.clickLogic();}}>
        Top Individuals
      </button>
    )

  }
}

const IndividualsHUButton = connect(null, mapDispatchToProps)(RawIndividualsHUButton);

export default IndividualsHUButton;
