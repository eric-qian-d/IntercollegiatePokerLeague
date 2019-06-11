const uuidV4 = require('uuid/v4');
const models = require('../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');

const hashRounds = 5;

module.exports = {
  createUser : async (user) => {
    bcrypt.hash(user.password, hashRounds, function(err, hash) {
      user.password = hash;
      models.User.create(user);
    });
  },

  getUserByEmail : async (email) => {
    console.log(email);
    const match = { email: email };
    // const where = { [Op.or]: attributes };
    return await models.User.findOne({ where: match, attributes: { exclude: ['password'] } });
  }


}
