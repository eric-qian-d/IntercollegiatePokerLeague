const models = require('../models');
const fs = require('fs');

// const createSchool = async (name, domain) => {
//   await models.School.create(
//     {
//       name: name,
//       domain: domain
//     },
//   );
// }
//

/**
 * Adds a school to the database
 * @param {Array} list List containing the school information where list[0] is the school domain and list[1] is the school name
 */
async function addSchool(list) {
  const existingSchool = await models.School.findOne({where : {name : list[1]}});
  if (!existingSchool) {
    await models.School.create(
      {
        name: list[1],
        domain: list[0]
      },
    );
  }
}

module.exports = {
  createAllSchools: async () => {
    fs.readFile('./config/edu_domains.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const lineSplit = data.split('\r\n');
    const colonSplit = lineSplit.forEach(line => {
       const split = line.split(': ');
       addSchool(split);
    })

  })
    //
  }
}
