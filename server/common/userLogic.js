const uuidV4 = require('uuid/v4');
const models = require('../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');

module.exports = {
  createNewUser : async (user) => {
    console.log("trying to create this user");
    console.log(user);
    models.User.create(user);
  }
}
