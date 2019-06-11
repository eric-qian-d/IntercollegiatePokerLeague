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
  }),
  userStatus: Object.freeze({
    AVAILABLE: 'available',
    CUSTOM_MATCH_OWNER: 'custom match owner',
    IN_CUSTOM_MATCH: 'in custom match',
    IN_QUEUE: 'in queue',
    IN_GAME: 'in game'
  }),
  userLocations: Object.freeze({
    CUSTOM_LISTINGS: 'custom listings',
    CUSTOM_MATCH_LOBBY: 'custom match lobby',
    GAME: 'game',
    IN_QUEUE: 'in queue',
  })
}
