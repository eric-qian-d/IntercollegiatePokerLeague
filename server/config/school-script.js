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

async function addSchool(list) {
  await models.School.create(
    {
      name: list[1],
      domain: list[0]
    },
  );
}

module.exports = {
  createAllSchools: async () => {
    fs.readFile('./config/edu_domains.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const lineSplit = data.split('\r\n');
    // console.log(lineSplit);
    const colonSplit = lineSplit.forEach(line => {
      // console.log(line);
       const split = line.split(': ');
       console.log(split);
       addSchool(split);
    })

  })
    //
  }
}
