const express = require("express");
const router = express.Router();
const models = require("../models");


router.get('/hu-leaderboard', async (req, res, next) => {
  const leadersList = await models.User.findAll({
    attributes: ['firstName', 'lastName', 'rankedHURanking', 'schoolName'],
    raw: true,
    order: [['rankedHURanking', 'desc']]
  });
  console.log(leadersList);
  const adjustedLeadersList = leadersList.map(user => {
    console.log('in here');
    console.log(user);
    return [user.firstName + ' ' + user.lastName, user.rankedHURanking, user.schoolName]
  })
  console.log(adjustedLeadersList);
  return res.status(200).send({huRankings: adjustedLeadersList});

});

module.exports = router;
