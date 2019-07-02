import React from 'react';
import { connect } from "react-redux";
import PlayerRanking from './PlayerRanking';
import vars from '../../vars';
import './HULadderBoardContainer.css';

function mapStateToProps(state) {
  console.log(state);
  return {
    requestedLeaderboard: state.requestedLeaderboard,
  }
}

class RawHULadderBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      huRankings: [],
    }
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/rankings/hu-individual-leaderboard', {withCredentials: true, credentials: 'include'}, {
      })
      .then(response => response.json())
      .then(data => {
        this.setState({huRankings: data.huRankings });
      });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    // debugger;
    if (prevProps.requestedLeaderboard !== this.props.requestedLeaderboard) {
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/rankings/' + this.props.requestedLeaderboard, {withCredentials: true, credentials: 'include'}, {
        })
        .then(response => response.json())
        .then(data => {
          this.setState({huRankings: data.huRankings });
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const {huRankings} = this.state;
    const huRankingsList = huRankings.map((listing, place) => {
      return (
        <PlayerRanking name = {listing[0]} ranking = {listing[1]} place = {place + 1} school = {listing[2]} header = {false}/>
      )
    })
    return (
      <div id = 'HULadderBoardContainer'>
        <PlayerRanking header = {true}/>
        {huRankingsList}
      </div>
    )
  }
}

const HULadderBoardContainer = connect(mapStateToProps)(RawHULadderBoardContainer);

export default HULadderBoardContainer;
