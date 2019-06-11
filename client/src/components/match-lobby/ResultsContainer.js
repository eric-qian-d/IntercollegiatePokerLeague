import React from 'react';
import VersusResult from './VersusResult';
import {getResults} from "../../js/custom-match-lobby";

class ResultsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
    }
  }

  render() {
    console.log('matches');
    console.log(this.state.matches);
    const versusResultsList = this.state.matches.map(game => {
      return <VersusResult game = {game}/>
    })
    return (
      <div className = 'ResultsContainer'>
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
