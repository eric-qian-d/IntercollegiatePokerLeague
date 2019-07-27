import React from 'react';
import { connect } from "react-redux";
import {changeStoreState} from '../../actions/index';
// import './RaiseSlider.css';

function mapDispatchToProps(dispatch) {
  return {
    changeStoreState: article => dispatch(changeStoreState(article))
  };
}

function mapStateToProps(state) {
  return {
    raiseSize: state.raiseSize,
  }
}

class RawRaiseSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeStoreState({raiseSize: event.target.value});
  }

  render() {
    const {minBet, maxBet} = this.props;
    return(
      <div id="slideContainer">
        <input type="range" min={minBet} max={maxBet} id="slider" value={this.props.raiseSize} onChange={this.handleChange}/>
      </div>
    )
  }
}
const RaiseSlider = connect(mapStateToProps, mapDispatchToProps)(RawRaiseSlider);
export default RaiseSlider;
