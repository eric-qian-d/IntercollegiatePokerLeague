import React from "react";

import {newHUMatch} from "../../js/hu-match-lobby";

class newHUMatchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numPlayers: '0',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(target);
    console.log(name);
    console.log(value);
    this.setState({[name]: value});
    console.log(this.state.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("from new match button ")
    newHUMatch(this.state.name, this.state.numPlayers);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Game Name:
          <input type="text" name = "name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Number of Players:
          <input type="text" name = "numPlayers" value={this.state.numPlayers} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Make New Game" />
      </form>
    );
  }
}

export default newHUMatchButton;
