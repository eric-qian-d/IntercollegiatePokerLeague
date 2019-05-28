import React from 'react';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: props.name,
    //   numPlayers: props.numPlayers,
    // }
  }

  render() {

    return (
      <div>
        {this.props.name}
        {this.props.numPlayers}
      </div>
    );
  }
}

export default Listing;
