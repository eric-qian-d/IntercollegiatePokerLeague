import React from "react";
import {returnToListings} from "../../js/custom-match-lobby";

class ReturnToListingsButton extends React.Component {
  constructor(props) {
    super(props);
  }

  beginMatchLogic() {
    returnToListings(this.props.socket);
  }

  render() {
    return(
      <div>
        <button onClick = {() => {this.beginMatchLogic()}}>
          Return to Listings
        </button>
      </div>
    )
  }
}

export default ReturnToListingsButton;
