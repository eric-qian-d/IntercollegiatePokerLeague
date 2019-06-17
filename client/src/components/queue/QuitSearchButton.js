import React from 'react';
import vars from '../../vars';

class QuitSearchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  onClick() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/cancel-match', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
      credentials : 'include',
      withCredentials : true,
    });
    this.props.history.push('/choose-game');
  }

  render() {
    return (
      <button className = 'QuitSearchButton' onClick = {() => {this.onClick();}}>
        Quit Searching
      </button>
    )
  }
}

export default QuitSearchButton;
