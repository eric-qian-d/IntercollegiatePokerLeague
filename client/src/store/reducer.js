const initialState = {
  gameType: 'none',
  matchId: 'none',
  raiseSize: 0,

  numPlayers: 0,
  buttonLocation: 0,
  action: 0,
  pot: 0,
  board: [],
  players: [],
  time: 0,
  finished: false,
  maxTime: 0,
  checkable: 0,
  minBet: 0,
  maxBet: 0,
  smallBet: 0,
  mediumBet: 0,
  largeBet: 0,
  smallBetText: '1/2 Pot',
  mediumBetText: '2/3 Pot',
  largeBetText: 'Pot',
  victory: false,
  displaySurrender: false,
};

function rootReducer(state = initialState, action) {
  console.log(action.payload);
  if (action.type === 'CHANGE_STATE') {
    const newState = Object.assign({}, state,
      action.payload
    );
    console.log(newState);
    return newState;
  }
  return state;
}

export default rootReducer;
