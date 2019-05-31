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
app.post('/login',
  passport.authenticate('local', { successRedirect: '/asdf',
                                   failureRedirect: '/login',
                                   })
);



module.exports = app;
