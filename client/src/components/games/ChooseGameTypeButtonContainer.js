import React from 'react';
import CustomGamesButton from './CustomGamesButton';
import NormalHUGameButton from './NormalHUGameButton';
import RankedHUGameButton from './RankedHUGameButton';
import PlayButton from './PlayButton';
import './ChooseGameTypeButtonContainer.css';

class ChooseGameTypeButtonContainer extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div id = 'ChooseGameTypeButtonContainer'>
          <NormalHUGameButton />
          <RankedHUGameButton />

      </div>
    )

  }

}

export default ChooseGameTypeButtonContainer;
