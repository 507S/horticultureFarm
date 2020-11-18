module.exports = (sequelize, Sequelize) => {
    const charaKolom = sequelize.define("charakolom", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      cname: {
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
      parbotto: {
        type: Sequelize.STRING
      },
      
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return charaKolom;
  };