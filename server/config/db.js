const pg = require('pg');

const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbEndpoint = process.env.DB_ENDPOINT || '127.0.0.1';

const pool = new pg.Pool({
  user: dbUser,
  host: dbEndpoint,
  database: 'poker',
  password: dbPassword,
  port: '5432'
});

pool.query("CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, lastName VARCHAR(40) NOT NULL)", (err, res) => {
  console.log(err, res);
  pool.end();
});
