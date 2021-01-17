module.exports = (sequelize, Sequelize) => {
    const winterVeg = sequelize.define("winterveg", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      doshcholti: {
        type: Sequelize.STRING
      },
      ekshoucchocholti: {
        type: Sequelize.STRING
      },
      ekshohybridcholti: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      }
    });
  
    return winterVeg;
  };
