import React from 'react';
import NewMatchForm from './NewMatchForm';

class MatchCreationPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket} = this.props;
    return (
      <NewMatchForm socket = {socket} />
    )
  }
}

export default MatchCreationPageContainer;
