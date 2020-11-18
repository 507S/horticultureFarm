module.exports = (sequelize, Sequelize) => {
    const otherFlower = sequelize.define("otherflower", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      polyshotero: {
        type: Sequelize.STRING
      },
      tobshotero: {
        type: Sequelize.STRING
      },
      polyatharo: {
        type: Sequelize.STRING
      },
      tobatharo: {
        type: Sequelize.STRING
      },
      polyunish: {
        type: Sequelize.STRING
      },
      tobunish: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return otherFlower;
  };