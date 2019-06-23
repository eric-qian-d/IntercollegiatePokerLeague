const session = require('express-session');
const redis   = require("redis");
const redisStore = require('connect-redis')(session);
const client  = redis.createClient({host: 'localhost', port: 6379});
// const MemoryStore = require('memorystore')(session);


const connectTimeout = 24 * 60 * 60 * 1000;
const maxRetryTime = 3 * 60 * 1000;
const retryStrategy = options => {
  const message = `Scheduler can't connect to redis server - attempt ${options.attempt}`;
  logger.info({ component: 'Scheduler', message });
  // If we've been trying for 30 minutes, stop trying.
  // WARNING: if redis goes down for longer, this doesn't recover and needs a server restart
  // Limited by connect_timeout
  if (options.total_retry_time > connectTimeout - 2 * maxRetryTime) {
    return new Error('Retry time exhausted');
  }
  return Math.min(options.attempt * options.attempt * 1000, maxRetryTime);
};

// const newStore = new redisStore({ client: client,ttl :  260})
const newStore = new redisStore({host: 'localhost', port: 6379, retry_strategy: retryStrategy, connect_timeout : connectTimeout})


client.on("error", function (err)
{
    console.log("REDIS Error " + err);
});

// console.log(newStore);

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
