export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};

export function changeGameType(payload) {
  return { type: 'CHANGE_GAME_TYPE', payload }
};
