module.exports = (sequelize, Sequelize) => {
    const folMosholla = sequelize.define("folmosholla", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      item: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      cholti: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      }
    });
  
    return folMosholla;
  };