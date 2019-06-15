import React from 'react';
import {raise} from "../../js/gameplay";

import './RaiseButton.css';


class RaiseButton extends React.Component {
  //from https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);
    this.state = {
      value : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    raise(this.props.socket, this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className = 'RaiseButton' onSubmit={this.handleSubmit}>
      <input className = 'RaiseButtonButton' type="submit" value="Raise to" />
      <input className = 'RaiseButtonInput' type="text" value={this.state.value} onChange={this.handleChange} />

      </form>
    );
  }
}

export default RaiseButton;
