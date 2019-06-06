import React from "react";
const cards = "../../../public/cards";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //to fill in once we get card images
    const {card} = this.props;
    console.log(cards + "/" + card[0] + '-' + card[1] + '.png');
    return (
      <div className = "Card">
        <img src = {'/cards' + "/" + card[0] + '-' + card[1] + '.png'}/>
      </div>
    )
  }
}

export default Card;
