const initialState = {
  articles: [],
  gameType: 'none',
  matchId: 'none',
};

function rootReducer(state = initialState, action) {
  if (action.type === 'ADD_ARTICLE') {
    console.log(action.payload);
    const newState = Object.assign({}, state,
      action.payload
    );
    console.log(newState);
    return newState;
  } else if (action.type === 'CHANGE_GAME_TYPE') {
    const newState = Object.assign({}, state,
      action.payload
    );
    console.log(newState);
    return newState;
  } else if (action.type === 'CHANGE_REQUESTED_LEADERBOARD') {
    const newState = Object.assign({}, state,
      action.payload
    );
    console.log(newState);
    return newState;
  }
  return state;
}

export default rootReducer;
