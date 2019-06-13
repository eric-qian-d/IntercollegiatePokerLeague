import React from 'react';
import PlayerRanking from './PlayerRanking';

class HULadderBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      huRankings: [],
    }
  }

  componentDidMount() {
    console.log('getting hu leaderboard data');
    fetch("http://localhost:8081/api/rankings/hu-leaderboard", {withCredentials: true, credentials: 'include'}, {
      })
      .then(response => response.json())
      .then(data => {
        this.setState({huRankings: data.huRankings });
      });
  }

  render() {
    const {huRankings} = this.state;
    const huRankingsList = huRankings.map((listing, place) => {
      return (
        <PlayerRanking name = {listing[0]} ranking = {listing[1]} place = {place + 1}/>
      )
    })
    return (
      <div className = 'HULadderBoardContainer'>>
        {huRankingsList}
      </div>
    )
  }
}

export default HULadderBoardContainer;
