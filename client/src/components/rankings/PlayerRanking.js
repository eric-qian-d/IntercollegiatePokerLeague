import React from 'react';
import './PlayerRanking.css';

class PlayerRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, place, ranking, school, header} = this.props;
    if (header) {
      return (
        <div className = 'PlayerRanking'>
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
    } else {
      return (
        <div className = 'PlayerRanking'>
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
}

export default PlayerRanking;
