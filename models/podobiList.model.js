module.exports = (sequelize, Sequelize) => {
  const podobiList = sequelize.define("podobilist", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    podobi: {
      type: Sequelize.STRING
    },
    grade: {
      type: Sequelize.STRING
    },
  });

  return podobiList;
};