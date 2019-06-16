const uuidV4 = require('uuid/v4');
const models = require('../models');
// const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');

const hashRounds = 5;

module.exports = {
  createUser : async (user) => {
    const email = user.email;
    const splitEmail = email.split('@');
    if (splitEmail.length == 2) {
      domain = splitEmail[1];
      const school = await models.School.findOne({ where: {domain: domain} , raw: true});
      if (school === null) {
        user.schoolName = "Undetermined";
        //to fill in school id that is standard for undetermined schools
      } else {
        user.schoolName = school.name;
        user.schoolId = school.id;
      }


      bcrypt.hash(user.password, hashRounds, function(err, hash) {
        console.log('password');
        console.log(user.password);
        user.password = hash;
        // console.log(user);
        models.User.create(user);
      });
    }

  },

  getUserByEmail : async (email) => {
    const match = { email: email };
    return await models.User.findOne({ where: match, attributes: { exclude: ['password'] } });
  },

  associateAllUsersWithSchools : async () => {
    const users = await models.User.findAll({attributes: ['email', 'id', 'schoolName'], raw: true});
    users.forEach(async (user) => {
      if (user.schoolName === 'Undetermined') {
        const email = user.email;
        const domain = email.split('@')[1];
        const school = await models.School.findOne({ where: {domain: domain} , raw: true});
        if (school === null) {
          user.schoolName = "Undetermined";
          //to fill in school id that is standard for undetermined schools
        } else {
          const schoolName = school.name;
          const schoolId = school.id;
          models.User.update({schoolName: schoolName, schoolId: schoolId}, {where: {id: user.id}});
        }
      }
    })
  }


}
