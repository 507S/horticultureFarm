module.exports = (sequelize, Sequelize) => {
  const irregularWorker = sequelize.define("irregularworker", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    nid: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return irregularWorker;
};