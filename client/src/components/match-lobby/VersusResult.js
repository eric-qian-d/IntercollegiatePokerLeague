import React from 'react';
import PlayerListing from './PlayerListing';
import './VersusResult.css';

class VersusResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {game} = this.props;
    return(
      <div id = 'VersusResult'>
        <PlayerListing player = {game[0][0]} status = {game[0][1]}/>
        <PlayerListing player = {game[1][0]} status = {game[1][1]}/>
      </div>
    )
  }
}

export default VersusResult;
