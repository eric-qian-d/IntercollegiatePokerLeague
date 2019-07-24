import React from 'react';
import {raise} from "../../js/gameplay";
import { connect } from "react-redux";
import {changeGameType} from '../../actions/index';
import './RaiseInput.css';

function mapDispatchToProps(dispatch) {
  return {
    changeGameType: article => dispatch(changeGameType(article))
  };
}

function mapStateToProps(state) {
  return {
    raiseSize: state.raiseSize,
  }
}

class RawRaiseInput extends React.Component {
  //from https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);
    this.state = {
      value : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeGameType({raiseSize: event.target.value});
  }


  render() {
    return (
        <input id = 'RaiseInput' type="text" value={this.props.raiseSize} onChange={this.handleChange} />
    );
  }
}

const RaiseInput = connect(mapStateToProps, mapDispatchToProps)(RawRaiseInput);
export default RaiseInput;
