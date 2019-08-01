import React from 'react';
import './IndividualsHUHeader.css'

class IndividualsHUHeader extends React.Component {
  render() {
    return (
      <div id = 'IndividualsHUHeader' className = 'RankingHeader MediumDiv'>
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
