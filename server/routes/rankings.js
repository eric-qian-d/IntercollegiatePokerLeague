const express = require('express');
const router = express.Router();
const models = require('../models');
const userLogic = require('../common/userLogic');


router.get('/hu-leaderboard', async (req, res, next) => {
  const leadersList = await userLogic.getLeaders();
  const adjustedLeadersList = leadersList.map(user => {
    return [user.firstName + ' ' + user.lastName, user.rankedHURanking, user.schoolName]
  })
  console.log(adjustedLeadersList);
  return res.status(200).send({huRankings: adjustedLeadersList});

});

module.exports = router;
