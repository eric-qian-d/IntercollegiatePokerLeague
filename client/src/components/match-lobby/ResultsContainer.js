import React from 'react';
import VersusResult from './VersusResult';
import {getResults} from "../../js/custom-match-lobby";
import './ResultsContainer.css';

class ResultsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
    }
  }

  render() {
    const versusResultsList = this.state.matches.map(game => {
      return <VersusResult game = {game}/>
    })
    return (
      <div id = 'ResultsContainer'>
        {versusResultsList}
      </div>
    )
  }

  componentDidMount() {
    getResults(this.props.socket);
    this.props.socket.on("MATCH RESULTS", (matches) => {
      this.setState({matches : matches});
    });
  }
}

export default ResultsContainer;
