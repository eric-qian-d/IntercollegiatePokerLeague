import React from 'react';
import CallButton from "./CallButton";
import FoldButton from "./FoldButton";
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
        <div className = "FoldButtonDiv">
          <FoldButton socket = {socket}/>
        </div>
        <div className = "CallButtonDiv">
          <CallButton  socket = {socket} checkable = {checkable}/>
        </div>
        <div className = "RaiseButtonDiv">
          <RaiseContainer socket = {socket} minBet = {minBet}
          maxBet = {maxBet} smallBet = {smallBet}
          mediumBet = {mediumBet} largeBet = {largeBet} smallBetText = {smallBetText}
          mediumBetText = {mediumBetText} largeBetText = {largeBetText}/>
        </div>
      </div>

    )
  }
}

export default ButtonBox;
