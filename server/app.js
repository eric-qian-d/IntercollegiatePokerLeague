const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require("passport");

const passportConfigure = require("./common/passport");
const registration = require("./routes/registration");

passportConfigure.configure(passport);

const app = express();
app.set('port', 8081);

app.use(cors());
app.use(bodyParser());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api/registration", registration);
// app.post('/login', (req, res) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       res.send(err)
//     }
//   })
// }
//
// );
//
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
      return res.status(200).send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});



module.exports = app;
