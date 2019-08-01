const uuidV4 = require('uuid/v4');
const models = require('../models');
// const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');
const sendgrid = require('../integrations/sendgrid');

const hashRounds = 5;

module.exports = {
  createUser : async (user) => {
    const email = user.email;
    const splitEmail = email.split('@');
    if (splitEmail.length == 2) {
      const subdomainCheck = splitEmail[1].split('.');
      domain = subdomainCheck[subdomainCheck.length-2].concat('.', subdomainCheck[subdomainCheck.length-1]);
      const school = await models.School.findOne({ where: {domain: domain} , raw: true});
      if (school === null) {
        const undefinedSchool = await models.School.findOne({ where: {name: 'Undetermined'} , raw: true});
        user.schoolName = undefinedSchool.name;
        user.schoolId = undefinedSchool.id;
        //to fill in school id that is standard for undetermined schools
      } else {
        user.schoolName = school.name;
        user.schoolId = school.id;
      }

      const emailVerificationId = uuidV4();
      const emailVerificationSentOn = new Date();

      user.emailVerificationId = emailVerificationId;
      user.emailVerificationSentOn = emailVerificationSentOn;

      bcrypt.hash(user.password, hashRounds, function(err, hash) {
        user.password = hash;
        models.User.create(user);
        sendgrid.sendWelcomeEmail(user.email, user.firstName, user.lastName, emailVerificationId);
      });
    }

  },

  getUserByEmail : async (email) => {
    const match = { email: email };
    return await models.User.findOne({ where: match, attributes: { exclude: ['password'] }, raw: true });
  },

  getUserById : async (id) => {
    return await models.User.findOne({ where: {id: id}, attributes: { exclude: ['password'] }, raw: true });
  },

  associateAllUsersWithSchools : async () => {
    const users = await models.User.findAll({attributes: ['email', 'id', 'schoolName'], raw: true});
    users.forEach(async (user) => {
      // if (user.schoolName !== 'Undetermined') {
        const email = user.email;
        const domain = email.split('@')[1];
        const school = await models.School.findOne({ where: {domain: domain} , raw: true});
        if (school === null) {
          const undefinedSchool = await models.School.findOne({ where: {name: 'Undetermined'} , raw: true});
          user.schoolName = undefinedSchool.name;
          user.schoolId = undefinedSchool.id;
          //to fill in school id that is standard for undetermined schools
        } else {
          const schoolName = school.name;
          const schoolId = school.id;
          models.User.update({schoolName: schoolName, schoolId: schoolId}, {where: {id: user.id}});
        }
      // }
    })
  },

  getLeaders: async () => {
    const leaders = await models.User.findAll({
      attributes: ['firstName', 'lastName', 'rankedHURanking', 'schoolName'],
      raw: true,
      where: { emailIsVerified: true },
      order: [['rankedHURanking', 'desc']]
    });
    return leaders; //can limit the number of leaders returned from here
  },

  getTopUsersBySchool: async (schoolId) => {
    // console.log(schoolId);
    const leaders = await models.User.findAll({
      where: {schoolId: schoolId},
      attributes: ['firstName', 'lastName', 'rankedHURanking', 'schoolName'],
      raw: true,
      order: [['rankedHURanking', 'desc']]
    });
    return leaders; //can limit the number of leaders returned from here
  },

  verifyEmail: async (userId) => {
    models.User.update({emailIsVerified: true}, {where: {id: userId}});
  },

  resendEmailVerification: async (userEmail, userFirstName, userLastName, userId) => {
    const emailVerificationId = uuidV4();
    const emailVerificationSentOn = new Date();
    models.User.update({emailVerificationId: emailVerificationId, emailVerificationSentOn: emailVerificationSentOn}, {where: {id: userId}});
    sendgrid.sendWelcomeEmail(userEmail, userFirstName, userLastName, emailVerificationId);
  }


}
