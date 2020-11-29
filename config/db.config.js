const { DBUSER, DBPASSWORD } = process.env;
module.exports = {
  HOST: "localhost",
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: "horticultures",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
