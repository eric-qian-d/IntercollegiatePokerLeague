import React from "react";
import {returnToListings} from "../../js/custom-match-lobby";
import './ReturnToListingsButton.css';

class ReturnToListingsButton extends React.Component {
  constructor(props) {
    super(props);
  }

  beginMatchLogic() {
    returnToListings(this.props.socket);
  }

  render() {
    return(
        <button id = 'ReturnToListingsButton' className = 'BackgroundDiv' onClick = {() => {this.beginMatchLogic()}}>
          Return to Listings
        </button>
    )
  }
}

export default ReturnToListingsButton;
