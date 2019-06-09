LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const models = require("../models");


module.exports = {
  configure: passport => {
    passport.serializeUser(function(user, done) {
      const userCopy = user.toJSON();
      delete userCopy.password;
      done(null, userCopy);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(
      new LocalStrategy({usernameField: 'email'}, async function(email, password, done) {
        console.log(email);
        console.log(password);
        const user = await models.User.findOne({ where: { email: email } });
        if (!user) {
          console.log("user doesnt exist");
          return done(null, false, { message: 'User does not exist.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("wrong password");
          return done(null, false, { message: 'Password does not match username.' });
        }
        console.log("success");
        return done(null, user);
      })
    )
  }
}
