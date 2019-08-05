const express = require('express');
const cors = require('cors');
const session = require('./config/session');
const bodyParser = require('body-parser');
const passport = require('passport');
const chooseGame = require('./routes/game');

const passportConfigure = require('./common/passport');
const users = require('./routes/users');
const rankings = require('./routes/rankings');

// const school = require('./config/school-script');
// school.createUndeterminedSchool();

// const userLogic = require('./common/userLogic');
// userLogic.associateAllUsersWithSchools();


passportConfigure.configure(passport);

const app = express();
app.set('port', 8081);

app.use(cors({
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeader: ['sessionId'],
  origin: ['http://localhost:3000', 'http://pokerzone.io', 'http://www.pokerzone.io', 'https://pokerzone.io', 'https://www.pokerzone.io'],
  credentials: true
}));

app.use(bodyParser());
app.use(session.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users);
app.use('/api/choose-game', chooseGame);
app.use('/api/rankings', rankings);


//keep this here to keep passport modularized
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({ success : false, message : info.message });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      req.session.cookie.playerId = req.user.dataValues.id;
      return res.status(200).send({ success : true, resetPassword: info.resetPassword, verifyEmail: info.verifyEmail,  message : 'authentication succeeded' });

    });
  })(req, res, next);
});

app.post('/logout', function(req, res, next) {
  req.session.destroy(function (err) {
    return res.status(200).send({ success : true, message : 'logout succeeded' });
  })
});

module.exports = app;
