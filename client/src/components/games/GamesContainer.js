import React from 'react';
import CustomGamesButton from './CustomGamesButton';
import NormalHUGameButton from './NormalHUGameButton';
import RankedHUGameButton from './RankedHUGameButton';

class GamesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'GamesContainer'>
        <CustomGamesButton {...this.props} />
        <NormalHUGameButton />
        <RankedHUGameButton />
      </div>
    )

  }
}

export default GamesContainer;
