module.exports = (sequelize, Sequelize) => {
    const loan = sequelize.define("loan", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      boraddo: {
        type: Sequelize.STRING
      },
      bitoron1: {
        type: Sequelize.STRING
      },
      aday1: {
        type: Sequelize.STRING
      },
      left1: {
        type: Sequelize.STRING
      },
      bitoron2: {
        type: Sequelize.STRING
      },
      aday2: {
        type: Sequelize.STRING
      },
      left2: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return loan;
  };