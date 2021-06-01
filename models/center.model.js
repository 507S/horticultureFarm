module.exports = (sequelize, Sequelize) => {
    const center = sequelize.define("center", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      center: {
        type: Sequelize.STRING
      },
      serialNum: {
        type: Sequelize.INTEGER
      },
      kormokorta: {
        type: Sequelize.STRING
      },
      podobi: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      uname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return center;
  };