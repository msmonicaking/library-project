
// const { Pool } = require('pg');
//
//
// const pool = new Pool();
//
// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };


const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "babe",
  host: "localhost",
  port: 5433,
  database: "project111"
});

module.exports = pool;