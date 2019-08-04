import React from "react";
import {addNewHUMatch, cancelNewHUMatch} from "../../js/new-match";
import './NewMatchForm.css';

class newHUMatchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'My game',
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
      <form onSubmit={this.handleSubmit} id = 'NewMatchForm' className = 'WhiteDiv'>
        <div id = 'NewMatchDescriptionContainer' className = 'FormDescription DarkDiv'>
          <div id = 'NewMatchDescription'>
            Design your match
          </div>
        </div>
        <label className = 'NewMatchLabel'>
          Game Name:
          <input type="text" name = "name" className = 'NewMatchInput' placeholder = 'Enter a game name' value={this.state.name} onChange={this.handleChange} />
        </label>
        <label className = 'NewMatchLabel'>
          Number of Players:
          <input type="text" name = "numPlayers" className = 'NewMatchInput' placeholder = 'Enter number of players' value={this.state.numPlayers} onChange={this.handleChange} />
        </label>
        <label className = 'NewMatchLabel'>
          Number of Blinds:
          <input type="text" name = "numBlinds" className = 'NewMatchInput' placeholder = 'Enter number of blinds' value={this.state.numBlinds} onChange={this.handleChange} />
        </label>
        <div id = 'CustomMatchFormButtonsContainer' >
          <button type="button" id = 'CancelMakeNewCustomMatchButton' className = 'LightGreyDiv CustomMatchFormButton' onClick = {() => {cancelNewHUMatch(this.props.socket)}}>
            Cancel
          </button>
          <input type="submit" value="Create" id = 'CreateNewMatchButton' className = 'DarkDiv CustomMatchFormButton'/>
        </div>
      </form>
    );
  }
}

export default newHUMatchForm;
