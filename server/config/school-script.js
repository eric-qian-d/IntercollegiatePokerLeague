const models = require('../models');
const fs = require('fs');

/**
 * Adds a school to the database
 * @param {Array} list List containing the school information where list[0] is the school domain and list[1] is the school name
 */
async function addSchool(list) {
  // const existingSchool = await models.School.findOne({where : {name : list[1]}});
  // if (!existingSchool) {
    await models.School.create(
      {
        name: list[1],
        domain: list[0]
      },
    );
  // }
}

module.exports = {

  createAllSchools: async () => {
    //list of school domains and names taken from https://pastebin.com/LND21t5F

    // fs.readFile('./config/edu_domains.txt', 'utf-8', (err, data) => {
    //   if (err) throw err;
    //   const lineSplit = data.split('\r\n');
    //   const colonSplit = lineSplit.forEach(line => {
    //      const split = line.split(': ');
    //      addSchool(split);
    //   })
    // })

    //list of school domains and names taken from https://github.com/Hipo/university-domains-list
    //us schools: 2160
    //total schools: 9684

    // await models.School.destroy({
    //   where: {},
    //   truncate: true
    // });

    var content = fs.readFileSync('./config/world_universities_and_domains.json');
    var jsonContent = JSON.parse(content);
    // console.log(jsonContent);
    var ctr = 0;
    const uniqueDomains = {}
    jsonContent.forEach(async school => {
      // console.log(school);
      if (school.country === 'United States') {
        ctr++;
        // console.log(ctr);
        if (ctr > 1200) {
          const split = [school.domains[0], school.name];
          await addSchool(split)
        }
      }
    })

    // Object.keys(uniqueDomains).forEach(domain => {
    //   if (uniqueDomains[domain] > 1) {
    //   }
    // })

  },
  createUndeterminedSchool: async () => {
    addSchool(['', 'Undetermined']);
  }
}
