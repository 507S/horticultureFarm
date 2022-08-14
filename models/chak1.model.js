module.exports = (sequelize, Sequelize) => {
  const chak1 = sequelize.define("chak1", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    center: {
      type: Sequelize.STRING
    },
    porichito: {
      type: Sequelize.STRING
    },
    kormokorta: {
      type: Sequelize.STRING
    },
    nijDistrict: {
      type: Sequelize.STRING
    },
    podobi: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.STRING
    },
    firstdate: {
      type: Sequelize.STRING
    },
    presentDate: {
      type: Sequelize.STRING
    },
    pastDate: {
      type: Sequelize.STRING
    },
    pastWorkstation: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
   
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return chak1;
};