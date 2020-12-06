module.exports = (sequelize, Sequelize) => {
    const summerVeg = sequelize.define("summerveg", {
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
  
    return summerVeg;
  };