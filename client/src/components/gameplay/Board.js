import React from "react";
import Card from "./Card";

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {cardList} = this.props;
    const cardComponentList = cardList.map(card => {
      return (
        <Card card = {card} />
      )
    })
    return (
      <div className = "Board">
        {cardComponentList}
      </div>
    )
  }
}

export default Board;
