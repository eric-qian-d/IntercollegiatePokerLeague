import React from 'react';
import CallButton from "./CallButton";
import FoldButton from "./FoldButton";
import RaiseButton from './RaiseButton';
import RaiseInput from './RaiseInput';
import RaiseSlider from './RaiseSlider';
import RaiseContainer from "./RaiseContainer";

import './ButtonBox.css';

class ButtonBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {socket, checkable, minBet, maxBet, smallBet, mediumBet, largeBet,
    smallBetText, mediumBetText, largeBetText} = this.props;
    return (
      <div className = "ButtonBox">
        <RaiseContainer minBet = {minBet}
        maxBet = {maxBet} smallBet = {smallBet}
        mediumBet = {mediumBet} largeBet = {largeBet} smallBetText = {smallBetText}
        mediumBetText = {mediumBetText} largeBetText = {largeBetText}/>
        <div id = 'RaiseInputsContainer'>
          <RaiseSlider minBet = {minBet} maxBet = {maxBet} />
          <RaiseInput/>
        </div>
        <div id = 'ActionButtonContainer'>

          <FoldButton socket = {socket}/>
          <CallButton  socket = {socket} checkable = {checkable}/>
          <RaiseButton socket = {socket}/>

        </div>
      </div>

    )
  }
}

export default ButtonBox;
