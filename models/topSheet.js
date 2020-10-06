module.exports = (sequelize, Sequelize) => {
    const topSheet = sequelize.define("topSheet", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      target: {
        type: Sequelize.STRING
      },
      lproduction: {
        type: Sequelize.STRING
      },
      cproduction: {
        type: Sequelize.STRING
      },
      tproduction: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return topSheet;
  };