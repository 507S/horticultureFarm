module.exports = (sequelize, Sequelize) => {
    const seasonalFlower = sequelize.define("seasonalflower", {
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
      polycholti: {
        type: Sequelize.STRING
      },
      bedcholti: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      }
    });
  
    return seasonalFlower;
  };