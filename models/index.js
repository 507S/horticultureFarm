const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.center = require("./center.model.js")(sequelize, Sequelize);
db.topSheet = require("./topSheet.js")(sequelize, Sequelize);
db.centerInfo = require("./centerInfo.js")(sequelize, Sequelize);
db.charaKolom = require("./charaKolom.model.js")(sequelize, Sequelize);
db.folMosholla = require("./folMosholla.model.js")(sequelize, Sequelize);
db.otherFlower = require("./otherFlower.model.js")(sequelize, Sequelize);
db.seasonalFlower = require("./seasonalFlower.model.js")(sequelize, Sequelize);
db.summerVeg = require("./summerVeg.model.js")(sequelize, Sequelize);
db.winterVeg = require("./winterVeg.model.js")(sequelize, Sequelize);
db.regularWorker = require("./regularWorker.model.js")(sequelize, Sequelize);
db.irregularWorker = require("./irregularWorker.model.js")(sequelize, Sequelize);
db.apa = require("./apa.model.js")(sequelize, Sequelize);
db.loan = require("./loan.model.js")(sequelize, Sequelize);
db.specialCoconut = require("./specialCoconut.model.js")(sequelize, Sequelize);
db.revolvingFund = require("./revolvingFund.model.js")(sequelize, Sequelize);
db.chak1 = require("./chak1.model.js")(sequelize, Sequelize);
db.chak2 = require("./chak2.model.js")(sequelize, Sequelize);
db.rajossho = require("./rajossho.model.js")(sequelize, Sequelize);
db.rajosshoCode = require("./rajosshoCode.model.js")(sequelize, Sequelize);
db.expenseCode = require("./expenseCode.model.js")(sequelize, Sequelize);
db.expense = require("./expense.model.js")(sequelize, Sequelize);
db.monthlyProgress = require("./monthlyProgress.model.js")(sequelize, Sequelize);
db.cropcategory = require("./cropcategory")(sequelize, Sequelize);

db.production = require("./production.model")(sequelize, Sequelize);
db.daeprapti = require("./daeprapti.model")(sequelize, Sequelize);
db.bitoron = require("./bitoron.model")(sequelize, Sequelize);
db.daeprodan = require("./daeprodan.model")(sequelize, Sequelize);
db.mojud = require("./mojud.model")(sequelize, Sequelize);
db.mrito = require("./mrito.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);

module.exports = db;