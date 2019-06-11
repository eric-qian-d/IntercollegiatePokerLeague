const express = require("express");
const router = express.Router();
const models = "./models";
const states = require('../common/states');
const socketLogic = require('../bin/socket');

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
  if (userStatus[userId] === 'AVAILABLE') {
    userStatus[userId] = 'IN RANKED HU QUEUE';
    userLocation[userId] = 'IN QUEUE'
    if (rankedQueue.length == 1) {
      const otherPlayer = rankedQueue.shift();
      socketLogic.createNewRankedHUMatch(user, otherPlayer);
    } else {
      rankedQueue.push(user);
    }
  }

});

router.post('/join-normal', async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  if (userStatus[userId] === 'AVAILABLE') {
    userStatus[userId] = 'IN NORMAL HU QUEUE';
    userLocation[userId] = 'IN QUEUE'
    if (normalQueue.length == 1) {
      const otherPlayer = normalQueue.shift();
      socketLogic.createNewNormalHUMatch(user, otherPlayer);
    } else {
      normalQueue.push(user);
    }
  }

});

router.post('/cancel-ranked', async (req, res, next) => {


});

router.post('/cancel-normal', async (req, res, next) => {


});

router.get('/test', (req,res, next) => {

  console.log("success");
});

module.exports = router;
