const session = require('express-session');
const redis   = require("redis");
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
// const MemoryStore = require('memorystore')(session);
const newStore = new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260})

module.exports = {
  session: session({
    secret: 'tomakesecurelater',
    store: newStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 24*60*60*1000
    }
  }),
  MemoryStore: newStore,
}
