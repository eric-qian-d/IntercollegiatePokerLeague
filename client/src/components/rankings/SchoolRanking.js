import React from 'react';
import './SchoolRanking.css';

class SchoolRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, ranking, schoolName} = this.props;
    return (
      <div className = 'SchoolRanking RankingItem GreyDiv'>
        <div className = 'SchoolRankingPlace SchoolRankingInfo'>
          {place}
        </div>
        <div className = 'SchoolRankingName SchoolRankingInfo'>
          {schoolName}
        </div>
        <div className = 'SchoolRankingRanking SchoolRankingInfo'>
          {ranking}
        </div>
      </div>
    )


  }
}

export default SchoolRanking;
