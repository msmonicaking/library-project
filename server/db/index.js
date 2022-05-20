<<<<<<< HEAD
const{Pool} = require("pg");
=======
const { Pool } = require('pg');
>>>>>>> origin/master

const pool = new Pool();

module.exports = {
<<<<<<< HEAD
    query: (text, params) => pool.query(text, params),
=======
  query: (text, params) => pool.query(text, params),
>>>>>>> origin/master
};
