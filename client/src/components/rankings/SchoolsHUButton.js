import React from 'react';
import { connect } from "react-redux";
import './SchoolsHUButton.css';

import {changeRequestedLeaderboard} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    changeRequestedLeaderboard: leaderBoardType => dispatch(changeRequestedLeaderboard(leaderBoardType))
  };
}


class RawSchoolsHUButton extends React.Component {
  constructor(props) {
    super(props);
  }

  clickLogic() {
    this.props.changeRequestedLeaderboard('hu-school-leaderboard');
  }

  render() {
    return (
      <div id = 'SchoolsHUButton' onClick = {() => {this.clickLogic();}}>
        Top Schools
      </div>
    )

  }
}

const SchoolsHUButton = connect(null, mapDispatchToProps)(RawSchoolsHUButton);

export default SchoolsHUButton;
