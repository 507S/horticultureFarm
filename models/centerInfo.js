module.exports = (sequelize, Sequelize) => {
    const centerInfo = sequelize.define("centerinfo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      center: {
        type: Sequelize.STRING
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
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return centerInfo;
  };