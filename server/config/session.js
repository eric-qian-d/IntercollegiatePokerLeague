const session = require('express-session');
const redis   = require("redis");
const redisStore = require('connect-redis')(session);
const redisHost = process.env.REDIS_HOST || 'localhost';
const client  = redis.createClient({host: redisHost, port: 6379});

const connectTimeout = 24 * 60 * 60 * 1000;
const maxRetryTime = 3 * 60 * 1000;

const newStore = new redisStore({client: 'client', port: 6379, connect_timeout : connectTimeout})


client.on("error", function (err)
{
    console.log("REDIS Error " + err);
});


module.exports = {
  session: session({
    secret: 'tomakesecurelater',
    store: newStore,
    resave: false,
    saveUninitialized: true,
  }),
  MemoryStore: newStore,
}
