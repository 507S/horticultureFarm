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
      cholti: {
        type: Sequelize.STRING
      },
      parbotto: {
        type: Sequelize.STRING
      }
    });
  
    return charaKolom;
  };