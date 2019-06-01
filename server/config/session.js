const session = require("express-session");
const MemoryStore = require('memorystore')(session);
const newStore = new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
});

module.exports = {
  session: session({
    secret: 'somerandonstuffs',
    store: newStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 24*60*60*1000
    }
  }),
  MemoryStore: newStore,
}
