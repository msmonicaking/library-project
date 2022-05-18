const { Pool } = require('pg');

const pool = new Pool({
    user: 'dbuser',
    host: 'localhost',
    database: 'mydb',
    password: 'password',
    port: 3000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};