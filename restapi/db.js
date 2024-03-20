const Pool = require("pg").Pool;

const pool = new Pool ({
  host: "192.168.178.2",
  port: 5432,
  user: "ekey_manager",
  password: "f4saaGbepQkAC9QyoANC",
  database: "ekey"
});

module.exports = pool;

