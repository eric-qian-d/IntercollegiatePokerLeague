const models = require('../models');
const userLogic = require('./userLogic');

module.exports = {
  getTopSchools: async () => {
    const leaders = await userLogic.getLeaders();
    const schools = await models.School.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    const schoolMultiplyer = {};
    const schoolScore = {};
    leaders.forEach(player => {
      const schoolId = player.schoolId;
      if (!schoolMultiplyer.hasOwnProperty(schoolId)) {
        schoolMultiplyer[schoolId] = 1;
        schoolScore[schoolId] = 0;
      }
      if (schoolMultiplyer[schoolId] > 0.51) {
        schoolScore[schoolId] = schoolScore[schoolId] + player.rankedHURanking * schoolMultiplyer[schoolId];
        schoolMultiplyer[schoolId] = schoolMultiplyer[schoolId] - 0.01;

      }
    })
    schools.forEach(school => {
      school.ranking = schoolScore.hasOwnProperty(school.id) ?  schoolScore[school.id] : 0;
    })

    schools.sort((a, b) => (a.ranking > b.ranking) ? -1 : 1);
    return schools;
  }
}
