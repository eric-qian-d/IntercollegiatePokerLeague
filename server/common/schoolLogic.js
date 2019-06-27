const models = require('../models');
const userLogic = require('./userLogic');

module.exports = {
  getLeaders: async () => {
    const schools = await models.School.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    const schoolsAndPlayers = {};
    const schoolRankings = [];
    await schools.forEach(async (school) => {
      const schoolPlayers = await userLogic.getLeadersBySchool(school.id);
      if (schoolPlayers.length > 0) {
        schoolsAndPlayers[school.name] = schoolPlayers;
      }

    })
    console.log(schoolsAndPlayers);
    Object.keys(schoolsAndPlayers).forEach(school => {
      if (schoolsAndPlayers[school].length != 0) {
        console.log(school);
        console.log(schoolsAndPlayers[school]);
      }
    })
  }
}
