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
      shotero: {
        type: Sequelize.STRING
      },
      atharo: {
        type: Sequelize.STRING
      },
      unish: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return folMosholla;
  };