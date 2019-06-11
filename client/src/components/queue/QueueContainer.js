import React from 'react';
import QuitSearchButton from './QuitSearchButton';

class QueueContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'QueueContainer'>
        Finding Match
        <QuitSearchButton {...this.props}/>
      </div>
    )
  }
}

export default QueueContainer;
