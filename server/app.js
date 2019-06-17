const express = require('express');
const cors = require('cors');
const session = require('./config/session');
const bodyParser = require('body-parser');
const passport = require('passport');
const chooseGame = require('./routes/game');

const passportConfigure = require('./common/passport');
const registration = require('./routes/registration');
const rankings = require('./routes/rankings');

// const school = require('./config/school-script');
// school.createAllSchools();

// const userLogic = require('./common/userLogic');
// userLogic.associateAllUsersWithSchools();


passportConfigure.configure(passport);

const app = express();
app.set('port', 8081);

app.use(cors({
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeader: ['sessionId'],
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser());
app.use(session.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/registration', registration);
app.use('/api/choose-game', chooseGame);
app.use('/api/rankings', rankings);

app.get('/loggedin', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).send({loggedIn: true});
  } else {
    return res.status(200).send({loggedIn: false});
  }
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(401).send({ success : false, message : 'authentication failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      req.session.cookie.playerId = req.user.dataValues.id;
      return res.status(200).send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});

app.post('/logout', function(req, res, next) {
  req.session.destroy(function (err) {
    console.log(err);
  })
});

module.exports = app;
