module.exports = (sequelize, Sequelize) => {
    const dashImage = sequelize.define("dashimage", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return dashImage;
  };