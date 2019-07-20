import React from 'react';
import './PlayerRanking.css';

class PlayerRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, place, ranking, school} = this.props;
    return (
      <div className = 'PlayerRanking MediumDiv'>
        <div className = 'PlayerRankingPlace PlayerRankingInfo'>
          {place}
        </div>
        <div className = 'PlayerRankingName PlayerRankingInfo'>
          {name}
        </div>
        <div className = 'PlayerRankingSchool PlayerRankingInfo'>
          {school}
        </div>
        <div className = 'PlayerRankingRanking PlayerRankingInfo'>
          {ranking}
        </div>
      </div>
    )


  }
}

export default PlayerRanking;
