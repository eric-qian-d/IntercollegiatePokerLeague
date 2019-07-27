const initialState = {
  gameType: 'none',
  matchId: 'none',
  raiseSize: 0
};

function rootReducer(state = initialState, action) {
  if (action.type === 'CHANGE_STATE') {
    const newState = Object.assign({}, state,
      action.payload
    );
    return newState;
  }
  return state;
}

export default rootReducer;
