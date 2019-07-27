const express = require("express");
const router = express.Router();
const models = "./models";
const states = require('../common/states');
const socketLogic = require('../bin/socket');
const constants = require('../common/constants');

const userGameMap = states.userGameMap; //maps from playerId to gameId
const userMatchMap = states.userMatchMap; //maps from playerId to matchId
const userLocation = states.userLocation; //maps from playerId to //CUSTOM LISTINGS, CUSTOM MATCH LOBBY, GAME, IN QUEUE
const userSocketMap = states.userSocketMap; //maps from playerId to socket
const userStatus = states.userStatus; //maps from playerId to availability //AVAILABLE, CUSTOM MATCH OWNER, IN CUSTOM MATCH, IN QUEUE
const customMatchMap = states.customMatchMap; //maps from matchId to Match object
const gameMap = states.gameMap; //maps from gameId to Game object

const normalQueue = [];
const rankedQueue = [];

router.post('/join-ranked', async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  if (!userStatus.hasOwnProperty[userId]) {
    userStatus[userId] = constants.userStatus.AVAILABLE;
  }
  if (userStatus[userId] === constants.userStatus.AVAILABLE) {
    userStatus[userId] = constants.userStatus.IN_RANKED_HU_QUEUE;
    userLocation[userId] = constants.userLocation.IN_QUEUE;
    if (rankedQueue.length == 1) {
      const otherPlayer = rankedQueue.shift();
      socketLogic.createNewRankedHUMatch(user, otherPlayer);
    } else {
      rankedQueue.push(user);
    }
    return res.status(200).send({ success : true, message : 'join match succeeded' });
  }

});

router.post('/join-normal', async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  console.log(userStatus);
  console.log(userStatus.hasOwnProperty(userId));
  console.log(userId);
  if (!userStatus.hasOwnProperty(userId)) {
    userStatus[userId] = constants.userStatus.AVAILABLE;
  }
  if (userStatus[userId] === constants.userStatus.AVAILABLE) {
    userStatus[userId] = constants.userStatus.IN_NORMAL_HU_QUEUE;
    userLocation[userId] = constants.userLocation.IN_QUEUE;
    if (normalQueue.length == 1) {
      const otherPlayer = normalQueue.shift();
      socketLogic.createNewNormalHUMatch(user, otherPlayer);
    } else {
      normalQueue.push(user);
    }
    return res.status(200).send({ success : true, message : 'join match succeeded' });
  }

});

router.post('/cancel-match', async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  if (userStatus[userId] === constants.userStatus.IN_RANKED_HU_QUEUE) {
    rankedQueue.shift();
    userStatus[userId] = constants.userStatus.AVAILABLE;
    userLocation[userId] = constants.userLocation.OTHER;
  } else if (userStatus[userId] === constants.userStatus.IN_NORMAL_HU_QUEUE) {
    normalQueue.shift();
    userStatus[userId] = constants.userStatus.AVAILABLE;
    userLocation[userId] = constants.userLocation.OTHER;
  }
  return res.status(200).send({ success : true, message : 'cancel match succeeded' });
});


module.exports = router;
