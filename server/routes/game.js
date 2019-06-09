const express = require("express");
const router = express.Router();
const models = "./models";
const states = require('../common/states');

const playerGameMap = states.playerGameMap; //maps from playerId to gameId
const playerMatchMap = states.playerMatchMap; //maps from playerId to matchId
const playerStatusMap = states.playerStatusMap; //maps from playerId to //CUSTOM LISTINGS, CUSTOM MATCH LOBBY, GAME
const playerSocketMap = states.playerSocketMap; //maps from playerId to socket
const playerAvailable = states.playerAvailable; //maps from playerId to availability //AVAILABLE, CUSTOM MATCH OWNER, IN CUSTOM MATCH, IN QUEUE
const customMatchMap = states.customMatchMap; //maps from matchId to Match object
const gameMap = states.gameMap; //maps from gameId to Game object

const normalQueue = [];
const rankedQueue = [];

router.post('/join-ranked', async (req, res, next) => {
  
  console.log(req.user);
  const userId = req.user.id;
  playerAvailable[userId] = 'IN QUEUE';
});

router.post('/join-normal', async (req, res, next) => {


});

router.post('/cancel-ranked', async (req, res, next) => {


});

router.post('/cancel-normal', async (req, res, next) => {


});

router.get('/test', (req,res, next) => {

  console.log("success");
});

module.exports = router;
