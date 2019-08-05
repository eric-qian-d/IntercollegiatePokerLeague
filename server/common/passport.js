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
        email = email.toLowerCase();
        const user = await models.User.findOne({ where: { email: email } });
        if (!user) {
          console.log("user doesnt exist");
          return done(null, false, { message: 'User does not exist.', resetPassword: false });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          if (user.passwordVerificationActive && password === user.passwordVerificationId && Math.abs(new Date() - user.passwordVerificationSentOn) < 24 * 60 * 60 * 1000) {
            return done(null, user, { message: 'Temporary password being used', resetPassword: true, verifyEmail: user.emailIsVerified });
          } else {
            return done(null, false, { message: 'Password does not match username.', resetPassword: false, verifyEmail: user.emailIsVerified });
          }

        }
        return done(null, user, { message: 'Login success!', resetPassword: false, verifyEmail: !user.emailIsVerified});
      })
    )
  }
}
