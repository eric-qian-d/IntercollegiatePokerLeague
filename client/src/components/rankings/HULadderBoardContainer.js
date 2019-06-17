import React from 'react';
import PlayerRanking from './PlayerRanking';
import vars from '../../vars';

class HULadderBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      huRankings: [],
    }
  }

  componentDidMount() {
    console.log('getting hu leaderboard data');
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/rankings/hu-leaderboard', {withCredentials: true, credentials: 'include'}, {
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
        <PlayerRanking name = {listing[0]} ranking = {listing[1]} place = {place + 1} school = {listing[2]} header = {false}/>
      )
    })
    return (
      <div className = 'HULadderBoardContainer'>
        <PlayerRanking header = {true}/>
        {huRankingsList}
      </div>
    )
  }
}

export default HULadderBoardContainer;
