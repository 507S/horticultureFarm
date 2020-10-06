module.exports = (sequelize, Sequelize) => {
    const summerVeg = sequelize.define("summerVeg", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      doshatharo: {
        type: Sequelize.STRING
      },
      ekshoucchoatharo: {
        type: Sequelize.STRING
      },
      ekshohybridatharo: {
        type: Sequelize.STRING
      },
      doshbijunish: {
        type: Sequelize.STRING
      },
      ekshoucchounish: {
        type: Sequelize.STRING
      },
      ekshohybridunish: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return summerVeg;
  };