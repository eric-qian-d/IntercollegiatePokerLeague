const pg = require('pg')

var connectionString = "postgres://postgres:@localhost:5432/poker";

var client = new pg.Client(connectionString);
client.connect();







// module.exports = 
module.exports = client;
