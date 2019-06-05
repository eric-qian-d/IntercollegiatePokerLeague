import React from "react";
import Board from "./Board";
import PlayerContainer from "./PlayerContainer";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //How do I render a table lol
    const {numPlayers, buttonLocation, action, pot, players} = this.props;
    const playersList = players.map(player => {
      return (
        <PlayerContainer card1 = {player.hand[0]} card2 = {player.hand[1]} name = {player.id} stackSize = {player.stackSize} action = {action}/>
      )
    })
    return (
      <div>
      Pot: {pot}
      buttonLocation: {buttonLocation}
      {playersList}
      </div>
    )
  }
}

export default Table;
