import React from 'react';
import './SchoolsHUHeader.css';

class SchoolsHUHeader extends React.Component {
  render() {
    return (
      <div id = 'SchoolsHUHeader' className = 'MediumDiv'>
        <div className = 'SchoolRankingPlace SchoolHeaderInfo'>
          Ranking
        </div>
        <div className = 'SchoolRankingName SchoolHeaderInfo'>
          Name
        </div>
        <div className = 'SchoolRankingRanking SchoolHeaderInfo'>
          Elo
        </div>
      </div>
    )
  }
}

export default SchoolsHUHeader;
