import React from 'react';

class SchoolHUHeader extends React.Component {
  render() {
    return (
      <div className = 'SchoolsHUHeader'>
        <div className = 'PlayerRankingPlace PlayerRankingInfo'>
          Rank
        </div>
        <div className = 'PlayerRankingName PlayerRankingInfo'>
          Name
        </div>
        <div className = 'PlayerRankingRanking PlayerRankingInfo'>
          Elo
        </div>
      </div>
    )
  }
}

export default = SchoolsHUHeader;
