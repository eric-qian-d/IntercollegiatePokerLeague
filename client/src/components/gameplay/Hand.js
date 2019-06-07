import React from "react";
import Card from "./Card";
import './Hand.css';

class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card1, card2} = this.props;
    return (
      <div className = "Hand flex-container">
        <Card card = {card1} />
        <Card card = {card2} />
      </div>
    );
  }
}

export default Hand;
