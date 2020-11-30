module.exports = (sequelize, Sequelize) => {
  const expenseCode = sequelize.define("expensecode", {
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