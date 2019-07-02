export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};

export function changeGameType(payload) {
  return { type: 'CHANGE_GAME_TYPE', payload }
};

export function changeRequestedLeaderboard(leaderBoardType) {
  return { type: 'CHANGE_REQUESTED_LEADERBOARD', payload: {requestedLeaderboard: leaderBoardType} }
}
