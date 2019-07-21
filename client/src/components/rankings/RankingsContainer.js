import React from "react";
import Navbar from '../navbar/Navbar';
import ListingsContainer from './ListingsContainer';
import IndividualsHUButton from './IndividualsHUButton';
import SchoolsHUButton from './SchoolsHUButton';
import './RankingsContainer.css';

class RankingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = 'RankingsContainer'>
        <Navbar {...this.props}/>
        <div id = 'ListingsContainerWrapper' className = 'BackgroundDiv'>
          <IndividualsHUButton/>
          <SchoolsHUButton/>
          <ListingsContainer/>
        </div>
      </div>
    )
  }
}

export default RankingsContainer;
