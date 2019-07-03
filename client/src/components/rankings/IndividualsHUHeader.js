import React from 'react';

class IndividualsHUHeader extends React.Component {
  render() {
    return (
      <div className = 'IndividualHUHeader'>
        <div className = 'PlayerRankingPlace PlayerRankingInfo'>
          Rank
        </div>
        <div className = 'PlayerRankingName PlayerRankingInfo'>
          Name
        </div>
        <div className = 'PlayerRankingSchool PlayerRankingInfo'>
          School
        </div>
        <div className = 'PlayerRankingRanking PlayerRankingInfo'>
          Elo
        </div>
      </div>
    )
  }
}

export default IndividualsHUHeader;
