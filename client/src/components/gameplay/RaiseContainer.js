import React from 'react';
import ChooseRaiseSizeButton from './ChooseRaiseSizeButton';
import './RaiseContainer.css';

class RaiseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket, minBet, maxBet, smallBet, mediumBet, largeBet,
    smallBetText, mediumBetText, largeBetText} = this.props;
    return (
      <div id = 'RaiseContainer'>
          <ChooseRaiseSizeButton raiseSize = {minBet} buttonText = {'Min'}/>
          <ChooseRaiseSizeButton raiseSize = {smallBet} buttonText = {smallBetText}/>
          <ChooseRaiseSizeButton raiseSize = {mediumBet} buttonText = {mediumBetText}/>
          <ChooseRaiseSizeButton raiseSize = {largeBet} buttonText = {largeBetText}/>
          <ChooseRaiseSizeButton raiseSize = {maxBet} buttonText = {'Max'}/>
      </div>
    )
  }

}

export default RaiseContainer;
