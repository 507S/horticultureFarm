module.exports = (sequelize, Sequelize) => {
  const expenseCode = sequelize.define("expenseCode", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    code: {
      type: Sequelize.STRING
    },
    khat: {
      type: Sequelize.STRING
    },
  });

  return expenseCode;
};