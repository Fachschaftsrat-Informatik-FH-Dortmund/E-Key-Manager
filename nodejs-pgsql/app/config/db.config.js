module.exports = {
  HOST: "192.168.178.2",
  PORT: "5432",
  USER: "ekey_manager",
  PASSWORD: "f4saaGbepQkAC9QyoANC", /*TODO: passwort in klartext*/
  DB: "ekey",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
/*
max: maximum number of connection in pool
min: minimum number of connection in pool
idle: maximum time, in milliseconds, that a connection can be idle before being released
acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error*/
