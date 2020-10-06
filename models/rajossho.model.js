module.exports = (sequelize, Sequelize) => {
  const rajossho = sequelize.define("rajossho", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    code: {
      type: Sequelize.STRING
    },
    upokhat: {
      type: Sequelize.STRING
    },
    july1: {
      type: Sequelize.STRING
    },
    august1: {
      type: Sequelize.STRING
    },
    sept1: {
      type: Sequelize.STRING
    },
    oct1: {
      type: Sequelize.STRING
    },
    nov1: {
      type: Sequelize.STRING
    },
    dec1: {
      type: Sequelize.STRING
    },
    jan2: {
      type: Sequelize.STRING
    },
    feb2: {
      type: Sequelize.STRING
    },
    march2: {
      type: Sequelize.STRING
    },
    apr2: {
      type: Sequelize.STRING
    },
    may2: {
      type: Sequelize.STRING
    },
    june2: {
      type: Sequelize.STRING
    },
    total: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return rajossho;
};