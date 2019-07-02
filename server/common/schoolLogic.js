const models = require('../models');
const userLogic = require('./userLogic');

module.exports = {
  getTopSchools: async () => {
    const schools = await models.School.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    console.log(schools.length);
    // const schoolsAndRanking = {};
    var schoolNum = 0;
    const schoolRankings = [];
    const schoolPlayers = await Promise.all(schools.map(async (school) => {
      return await userLogic.getTopUsersBySchool(school.id);

    })
  );
    for (var i = 0; i < schools.length; i++) {
      // console.log(i);
      // console.log(schools[i]);
      var ctr = 0;
      var schoolRanking = 0;
      while (ctr < 50 && ctr < schoolPlayers[i].length) {
        schoolRanking = schoolRanking + (1- 0.01 * ctr) * schoolPlayers[i][ctr].rankedHURanking;
        ctr++;
      }
      schools[i].ranking = schoolRanking;
    }

    schools.sort((a, b) => (a.ranking > b.ranking) ? -1 : 1);
    console.log(schools);
    return schools;
  }
}
