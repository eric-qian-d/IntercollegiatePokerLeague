const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === 'ADD_ARTICLE') {
    const newState = Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
    console.log(newState);
    return newState;
  }
  return state;
}

export default rootReducer;
