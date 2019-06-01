const session = require("express-session");

module.exports = session({
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 24*60*60*1000
    }
})
