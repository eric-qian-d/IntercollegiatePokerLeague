import React from "react";
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card} = this.props;
    return (
        <img src = {'/cards/' + card[0] + '-' + card[1] + '.png'} className = "Card"/>
    )
  }
}

export default Card;
