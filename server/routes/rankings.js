const express = require('express');
const router = express.Router();
const models = require('../models');
const userLogic = require('../common/userLogic');
const schoolLogic = require('../common/schoolLogic');


router.get('/hu-individual-leaderboard', async (req, res, next) => {
  const leadersList = await userLogic.getLeaders();
  const adjustedLeadersList = leadersList.map(user => {
    return [user.firstName + ' ' + user.lastName, user.rankedHURanking, user.schoolName]
  })
  // console.log(adjustedLeadersList);
  return res.status(200).send({huRankings: adjustedLeadersList.slice(0, Math.min(adjustedLeadersList.length, 200))});

});

router.get('/hu-school-leaderboard', async (req, res, next) => {
  const leadersList = await schoolLogic.getTopSchools();
  const adjustedLeadersList = leadersList.map(school => {
    return [school.name, school.ranking, school.name]
  })
  return res.status(200).send({huRankings: adjustedLeadersList.slice(0, Math.min(adjustedLeadersList.length, 100))});

});

module.exports = router;
