const models = require('../models');
const fs = require('fs');

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
    //list of school domains and names taken from https://pastebin.com/LND21t5F
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
