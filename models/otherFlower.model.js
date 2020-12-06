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
      polycholti: {
        type: Sequelize.STRING
      },
      
      tobcholti: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      }
    });
  
    return otherFlower;
  };