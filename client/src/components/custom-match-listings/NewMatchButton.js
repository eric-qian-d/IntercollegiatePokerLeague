import React from "react";
import {newHUMatch} from "../../js/hu-match-listings";

class newHUMatchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'a',
      numPlayers: '0',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("from new match button ")
    newHUMatch(this.props.socket, this.state.name, this.state.numPlayers);
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
