module.exports = (sequelize, Sequelize) => {
  const specialCoconut = sequelize.define("specialCoconut", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    center: {
      type: Sequelize.STRING
    },
    boraddo: {
      type: Sequelize.STRING
    },
    target: {
      type: Sequelize.STRING
    },
    boughtNarikel: {
      type: Sequelize.STRING
    },
    seedProduction: {
      type: Sequelize.STRING
    },
    deadSeed: {
      type: Sequelize.STRING
    },
    salableSeedTarget: {
      type: Sequelize.STRING
    },
    salableSeedAchieved: {
      type: Sequelize.STRING
    },
    salableSeedPercentage: {
      type: Sequelize.STRING
    },
    salableSeedNumber: {
      type: Sequelize.STRING
    },
    soldSeed: {
      type: Sequelize.STRING
    },
    soldSeedPrice: {
      type: Sequelize.STRING
    },
    presentMojud: {
      type: Sequelize.STRING
    },
    earnedMoneyDD: {
      type: Sequelize.STRING
    },
    earnedMoneyDate: {
      type: Sequelize.STRING
    },
    earnedMoneyHead: {
      type: Sequelize.STRING
    },
    earnedMoneyLocalBank: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return specialCoconut;
};