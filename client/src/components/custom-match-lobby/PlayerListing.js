import React from "react";

class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  //eventually should make props pass in something that's not just a name
  render() {
    const {player, status} = this.props;
    const statusColorMap = {
      'lobby': 'black',
      'in progress': 'yellow',
      'won': 'green',
      'lost': 'red',
    }
    const style = {
      borderStyle: 'solid',
      borderWidth: '3px',
    }
    style.borderColor = statusColorMap[status];
    return (
      <div style = {style}>
        {player}
      </div>
    )
  }
}

export default PlayerListing;
