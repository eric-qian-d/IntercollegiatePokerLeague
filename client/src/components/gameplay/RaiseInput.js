import React from 'react';
import {raise} from "../../js/gameplay";
import { connect } from "react-redux";
import {changeStoreState} from '../../actions/index';
import './RaiseInput.css';

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

class RawRaiseInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.changeStoreState({raiseSize: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    raise(this.props.socket, this.props.raiseSize);
    // this.setState({value: ''});
  }


  render() {
    return (
      <form id = 'RaiseForm' onSubmit={this.handleSubmit}>
        <input id = 'RaiseInput' type="text" value={this.props.raiseSize} onChange={this.handleChange} />
      </form>
    );
  }
}

const RaiseInput = connect(mapStateToProps, mapDispatchToProps)(RawRaiseInput);
export default RaiseInput;
