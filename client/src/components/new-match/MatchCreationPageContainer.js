import React from 'react';
import NewMatchForm from './NewMatchForm';
import './MatchCreationPageContainer.css';

class MatchCreationPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket} = this.props;
    return (
      <div id = 'MatchCreationPageContainer'>
        <NewMatchForm socket = {socket} />
      </div>
    )
  }
}

export default MatchCreationPageContainer;
