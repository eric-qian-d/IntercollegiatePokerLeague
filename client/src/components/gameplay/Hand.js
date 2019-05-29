import React from "react";
import Card from "./Card";

class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card1, card2} = this.props;
    return (
      <div className = "Hand">
        <Card card = {card1} />
        <Card card = {card2} />
      </div>
    );
  }
}

export default Hand;
