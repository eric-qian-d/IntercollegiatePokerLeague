import React from 'react';
import './SchoolsHUHeader.css';

class SchoolsHUHeader extends React.Component {
  render() {
    return (
      <div id = 'SchoolsHUHeader' className = 'RankingHeader MediumDiv'>
        <div className = 'SchoolRankingPlace SchoolRankingInfo'>
          Ranking
        </div>
        <div className = 'SchoolRankingName SchoolRankingInfo'>
          Name
        </div>
        <div className = 'SchoolRankingRanking SchoolRankingInfo'>
          Elo
        </div>
      </div>
    )
  }
}

export default SchoolsHUHeader;
