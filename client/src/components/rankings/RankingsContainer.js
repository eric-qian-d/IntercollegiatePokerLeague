import React from "react";
import Navbar from '../navbar/Navbar';
import HULadderBoardContainer from './HULadderBoardContainer';
import IndividualsHUButton from './IndividualsHUButton';
import SchoolsHUButton from './SchoolsHUButton';

class RankingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = 'RankingsContainer'>
        <Navbar {...this.props}/>
        <IndividualsHUButton/>
        <SchoolsHUButton/>
        <HULadderBoardContainer/>
      </div>
    )
  }
}

export default RankingsContainer;
