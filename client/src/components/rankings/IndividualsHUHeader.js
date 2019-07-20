import React from 'react';
import './IndividualsHUHeader.css'

class IndividualsHUHeader extends React.Component {
  render() {
    return (
      <div id = 'IndividualsHUHeader' className = 'DarkDiv'>
        <div className = 'PlayerRankingPlace IndividualsHeaderInfo'>
          Rank
        </div>
        <div className = 'PlayerRankingName IndividualsHeaderInfo'>
          Name
        </div>
        <div className = 'PlayerRankingSchool IndividualsHeaderInfo'>
          School
        </div>
        <div className = 'PlayerRankingRanking IndividualsHeaderInfo'>
          Elo
        </div>
      </div>
    )
  }
}

export default IndividualsHUHeader;
