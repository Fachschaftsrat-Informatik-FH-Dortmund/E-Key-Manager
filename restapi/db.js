const Pool = require("pg").Pool;

const pool = new Pool ({
  host: "kjuno.de",
  port: 5432,
  user: "fsrmanager",
  password: "test1234",
  database: "postgres"
});

module.exports = pool;

