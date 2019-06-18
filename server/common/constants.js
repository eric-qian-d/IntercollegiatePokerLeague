module.exports = {
  gameTypes: Object.freeze({
    NORMAL: 'normal',
    RANKED: 'ranked',
    CUSTOM: 'custom',
  }),
  matchStates: Object.freeze({
    CREATION: 'creation',
    IN_PROGRESS: 'in progress',
    FINISHED: 'finished',
    REMOVED: 'removed'
  }),
  userStatus: Object.freeze({
    AVAILABLE: 'available',
    CUSTOM_MATCH_OWNER: 'custom match owner',
    IN_CUSTOM_MATCH: 'in custom match',
    IN_RANKED_HU_QUEUE: 'in ranked hu queue',
    IN_NORMAL_HU_QUEUE: 'in normal hu queue',
    IN_GAME: 'in game'
  }),
  userLocation: Object.freeze({
    CUSTOM_LISTINGS: 'custom listings',
    CUSTOM_MATCH_LOBBY: 'custom match lobby',
    MATCH_LOBBY: 'match lobby',
    GAME: 'game',
    IN_QUEUE: 'in queue',
    OTHER: 'other',
  })
}
