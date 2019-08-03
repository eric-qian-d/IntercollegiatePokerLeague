import React from "react";
import {addNewHUMatch} from "../../js/new-match";
import './NewMatchForm.css';

class newHUMatchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'a',
      numPlayers: '1',
      numBlinds: '100',
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
    addNewHUMatch(this.props.socket, this.state.name, this.state.numPlayers, this.state.numBlinds);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id = 'NewMatchForm' className = 'DarkDiv'>
        <div id = 'NewMatchDescription' className = 'FormDescription'>
          Design your match
        </div>
        <label className = 'NewMatchLabel'>
          Game Name:
          <input type="text" name = "name" className = 'NewMatchInput' value={this.state.name} onChange={this.handleChange} />
        </label>
        <label className = 'NewMatchLabel'>
          Number of Players:
          <input type="text" name = "numPlayers" className = 'NewMatchInput' value={this.state.numPlayers} onChange={this.handleChange} />
        </label>
        <label className = 'NewMatchLabel'>
          Number of Blinds:
          <input type="text" name = "numBlinds" className = 'NewMatchInput' value={this.state.numBlinds} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Create" id = 'CreateNewMatchButton'/>
      </form>
    );
  }
}

export default newHUMatchForm;
