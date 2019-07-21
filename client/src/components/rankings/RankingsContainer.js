import React from "react";
import Navbar from '../navbar/Navbar';
import ListingsContainer from './ListingsContainer';
import IndividualsHUButton from './IndividualsHUButton';
import SchoolsHUButton from './SchoolsHUButton';
import Helmet from 'react-helmet';
import './RankingsContainer.css';

class RankingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id = 'RankingsContainer'>
        <Navbar {...this.props}/>
        <div id = 'ListingsWrapper'>
          <div id = 'ListingsHeader' className = ''>
            <div id = 'ChooseRankingsContainer'>
              <IndividualsHUButton/>
              <SchoolsHUButton/>
            </div>
          </div>
          <ListingsContainer/>
        </div>
      </div>
    )
  }
}

export default RankingsContainer;
