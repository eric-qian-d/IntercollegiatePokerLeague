import React from "react";

class PlayerListing extends React.Component {
  constructor(props) {
    super(props);
  }

  //eventually should make props pass in something that's not just a name
  render() {
    return (
      <div>
        {this.props.player}
      </div>
    )
  }
}

export default PlayerListing;
