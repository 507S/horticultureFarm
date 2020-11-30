module.exports = (sequelize, Sequelize) => {
  const rajosshoCode = sequelize.define("rajosshocode", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    code: {
      type: Sequelize.STRING
    },
    upokhat: {
      type: Sequelize.STRING
    },
  });

  return rajosshoCode;
};