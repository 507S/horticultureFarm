module.exports = (sequelize, Sequelize) => {
    const monthlyProgress = sequelize.define("monthlyprogress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      category: {
        type: Sequelize.STRING
      },
      subCategory: {
        type: Sequelize.STRING
      },
      biboron: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      productionTarget: {
        type: Sequelize.STRING
      },
      productionCurrent: {
        type: Sequelize.STRING
      },
      productionTotal: {
        type: Sequelize.STRING
      },
      daePrapti: {
        type: Sequelize.STRING
      },
      bitoronCurrentMonth: {
        type: Sequelize.STRING
      },
      bitoronTotal: {
        type: Sequelize.STRING
      },


      daeProdan: {
        type: Sequelize.STRING
      },
      deadWriteup: {
        type: Sequelize.STRING
      },

      mojud: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      timeFrame: {
        type: Sequelize.JSON
      },
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return monthlyProgress;
  };