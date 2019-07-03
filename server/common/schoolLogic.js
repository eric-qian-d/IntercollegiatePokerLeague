const models = require('../models');
const userLogic = require('./userLogic');

module.exports = {
  getTopSchools: async () => {
    const schools = await models.School.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    var schoolNum = 0;
    const schoolRankings = [];
    const schoolPlayers = await Promise.all(schools.map(async (school) => {
      return await userLogic.getTopUsersBySchool(school.id);

    })
  );
    for (var i = 0; i < schools.length; i++) {
      var ctr = 0;
      var schoolRanking = 0;
      while (ctr < 50 && ctr < schoolPlayers[i].length) {
        schoolRanking = schoolRanking + (1- 0.01 * ctr) * schoolPlayers[i][ctr].rankedHURanking;
        ctr++;
      }
      schools[i].ranking = Math.round(schoolRanking);
      if (schools[i].name === 'Undetermined') {
        schools[i].ranking = -1;
      }
    }

    schools.sort((a, b) => (a.ranking > b.ranking) ? -1 : 1);
    return schools;
  }
}
