import React from 'react';
import { connect } from "react-redux";
import PlayerRanking from './PlayerRanking';
import SchoolRanking from './SchoolRanking';
import IndividualsHUHeader from './IndividualsHUHeader';
import SchoolsHUHeader from './SchoolsHUHeader';
import vars from '../../vars';
import './ListingsContainer.css';

function mapStateToProps(state) {
  return {
    requestedLeaderboard: state.requestedLeaderboard,
  }
}

class RawListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      huRankings: [],
      loading: true,
    }
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/rankings/hu-individual-leaderboard', {withCredentials: true, credentials: 'include'}, {
      })
      .then(response => response.json())
      .then(data => {
        this.setState({huRankings: data.huRankings, loading: false });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestedLeaderboard !== this.props.requestedLeaderboard) {
      this.setState({loading: true});
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/rankings/' + this.props.requestedLeaderboard, {withCredentials: true, credentials: 'include'}, {
        })
        .then(response => response.json())
        .then(data => {
          this.setState({huRankings: data.huRankings, loading: false });
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const {huRankings, loading} = this.state;
    const {requestedLeaderboard} = this.props;
    if (loading) {
      return (
        <div>
          loading!
        </div>
      )
    }
    if (requestedLeaderboard === 'hu-school-leaderboard') {
      const huRankingsList = huRankings.map((listing, place) => {
        return (
          <SchoolRanking schoolName = {listing[0]} ranking = {listing[1]} place = {place + 1}/>
        )
      })
      return (
        <div id = 'LadderListingsContainer'>
          <SchoolsHUHeader/>
          <div id = 'LadderListings' className = 'MediumDiv'>
            {huRankingsList}
          </div>
        </div>
      )
    } else {
      const huRankingsList = huRankings.map((listing, place) => {
        return (
          <PlayerRanking name = {listing[0]} ranking = {listing[1]} place = {place + 1} school = {listing[2]}/>
        )
      })
      return (
        <div id = 'LadderListingsContainer'>
          <IndividualsHUHeader/>
          <div id = 'LadderListings' className = 'MediumDiv'>

            {huRankingsList}
          </div>
        </div>
      )
    }
  }
}

const ListingsContainer = connect(mapStateToProps)(RawListingsContainer);

export default ListingsContainer;
