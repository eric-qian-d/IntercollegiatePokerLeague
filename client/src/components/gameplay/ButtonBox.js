import React from 'react';
import CallButton from "./CallButton";
import FoldButton from "./FoldButton";
import RaiseButton from './RaiseButton';
import RaiseInput from './RaiseInput';
import RaiseSlider from './RaiseSlider';
import RaiseContainer from "./RaiseContainer";
import { connect } from "react-redux";
import {changeStoreState} from '../../actions/index';

import './ButtonBox.css';

function mapStateToProps(state) {
  return {
    checkable: state.checkable,
    minBet: state.minBet,
    maxBet: state.maxBet,
    smallBet: state.smallBet,
    mediumBet: state.mediumBet,
    largeBet: state.largeBet,
    smallBetText: state.smallBetText,
    mediumBetText: state.mediumBetText,
    largeBetText: state.largeBetText,
  }
}

class RawButtonBox extends React.Component {
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
          <RaiseInput socket = {socket}/>
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

const ButtonBox = connect(mapStateToProps)(RawButtonBox)
export default ButtonBox;
