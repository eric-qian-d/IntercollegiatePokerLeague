import React from 'react';
import QuitSearchButton from './QuitSearchButton';
import './QueueContainer.css';

class QueueContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = 'QueueContainer'>
        <div id = 'QueueBody'>
          Finding Match
          <QuitSearchButton {...this.props}/>
        </div>
      </div>
    )
  }
}

export default QueueContainer;
