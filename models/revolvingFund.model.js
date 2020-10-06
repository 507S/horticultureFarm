module.exports = (sequelize, Sequelize) => {
  const revolvingFund = sequelize.define("revolvingFund", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    prapti: {
      type: Sequelize.STRING
    },
    presentOrtho: {
      type: Sequelize.STRING
    },
    pastOrtho: {
      type: Sequelize.STRING
    },
    totalOrtho: {
      type: Sequelize.STRING
    },
    bank: {
      type: Sequelize.STRING
    },
    soldPast: {
      type: Sequelize.STRING
    },
    soldPresent: {
      type: Sequelize.STRING
    },
    soldTotal: {
      type: Sequelize.STRING
    },
    chara: {
      type: Sequelize.STRING
    },
    productionTarget: {
      type: Sequelize.STRING
    },
    productionPast: {
      type: Sequelize.STRING
    },
    productionPresent: {
      type: Sequelize.STRING
    },
    productionTotal: {
      type: Sequelize.STRING
    },
    bitoronPast: {
      type: Sequelize.STRING
    },
    bitoronPresent: {
      type: Sequelize.STRING
    },
    bitoronDead: {
      type: Sequelize.STRING
    },
    bitoronTotal: {
      type: Sequelize.STRING
    },
    totalMojud: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return revolvingFund;
};