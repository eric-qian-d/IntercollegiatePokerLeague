import React from "react";
import Navbar from '../navbar/Navbar';
import ListingsContainer from './ListingsContainer';
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
        <ListingsContainer/>
      </div>
    )
  }
}

export default RankingsContainer;
