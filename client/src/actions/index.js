export function changeStoreState(payload) {
  return { type: 'CHANGE_STATE', payload }
};

export function changeRequestedLeaderboard(leaderBoardType) {
  return { type: 'CHANGE_STATE', payload: {requestedLeaderboard: leaderBoardType} }
}
