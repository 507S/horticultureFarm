const dotenv = require('dotenv');
dotenv.config()
const { DBUSER, DBPASSWORD, DB } = process.env;
//console.log(DBUSER, DBPASSWORD)
module.exports = {
  HOST: "127.0.0.1",
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
