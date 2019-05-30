const uuidV4 = require('uuid/v4');
const models = require('../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');

const hashRounds = 5;

module.exports = {
  createUser : async (user) => {
    console.log("trying to create this user");
    console.log(user);

    bcrypt.hash(user.password, hashRounds, function(err, hash) {
      user.password = hash;
      models.User.create(user);
    });
  }
}
