const session = require('express-session');
const redis   = require("redis");
const redisStore = require('connect-redis')(session);
const client  = redis.createClient({host: 'localhost', port: 6379});
// const MemoryStore = require('memorystore')(session);


const connectTimeout = 24 * 60 * 60 * 1000;
const maxRetryTime = 3 * 60 * 1000;

const newStore = new redisStore({host: 'localhost', port: 6379, connect_timeout : connectTimeout})


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
    // cookie: {
    //     expires: 24*60*60*1000
    // }
  }),
  MemoryStore: newStore,
}
