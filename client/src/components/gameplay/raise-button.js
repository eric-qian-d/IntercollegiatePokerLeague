import React from 'react';

import {raise} from "../../js/gameplay";


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
    raise(this.props.socket, this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Raise to:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Raise" />
      </form>
    );
  }
}

export default RaiseButton;
