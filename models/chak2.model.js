module.exports = (sequelize, Sequelize) => {
  const chak2 = sequelize.define("chak2", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING
    },
    grade: {
      type: Sequelize.STRING
    },
    pod: {
      type: Sequelize.STRING
    },
    working: {
      type: Sequelize.STRING
    },
    shunno: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return chak2;
};