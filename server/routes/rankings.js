const express = require("express");
const router = express.Router();
const models = require("../models");


router.get('/hu-leaderboard', async (req, res, next) => {
  const leadersList = await models.User.findAll({
    attributes: ['firstName', 'lastName', 'rankedHURanking', 'schoolName'],
    raw: true,
    order: [['rankedHURanking', 'desc']]
  });
  const adjustedLeadersList = leadersList.map(user => {
    return [user.firstName + ' ' + user.lastName, user.rankedHURanking, user.schoolName]
  })
  console.log(adjustedLeadersList);
  return res.status(200).send({huRankings: adjustedLeadersList});

});

module.exports = router;
