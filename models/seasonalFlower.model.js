module.exports = (sequelize, Sequelize) => {
    const seasonalFlower = sequelize.define("seasonalFlower", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      poriman: {
        type: Sequelize.STRING
      },
      polyatharo: {
        type: Sequelize.STRING
      },
      bedatharo: {
        type: Sequelize.STRING
      },
      polyunish: {
        type: Sequelize.STRING
      },
      bedunish: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return seasonalFlower;
  };