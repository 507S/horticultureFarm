var Center = require("./center.model");
var Cropcategory = require("./cropcategory")

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
        type: Sequelize.TEXT('long')
      },
      productionCurrent: {
        type: Sequelize.TEXT('long')
      },
      productionTotal: {
        type: Sequelize.TEXT('long')
      },
      daePrapti: {
        type: Sequelize.TEXT('long')
      },
      bitoronCurrentMonth: {
        type: Sequelize.TEXT('long')
      },
      bitoronTotal: {
        type: Sequelize.TEXT('long')
      },
      daeProdan: {
        type: Sequelize.TEXT('long')
      },
      lastYearJer:{
        type: Sequelize.STRING
      },
      deadWriteup: {
        type: Sequelize.TEXT('long')
      },

      mojud: {
        type: Sequelize.TEXT('long')
      },
      comment: {
        type: Sequelize.TEXT('long')
      },
      timeFrame: {
        type: Sequelize.TEXT('long')
      },
      categoryId:{
        type: Sequelize.INTEGER,
        reference:{
          model: Cropcategory,
          key: 'id'
        }
      },
      subCategoryId:{
        type: Sequelize.INTEGER,
        reference:{
          model: Cropcategory,
          key: 'id'
        }
      },
      biboronId:{
        type: Sequelize.INTEGER,
        reference:{
          model: Cropcategory,
          key: 'id'
        }
      },
      breedId:{
        type: Sequelize.INTEGER,
        reference:{
          model: Cropcategory,
          key: 'id'
        }
      },
      centerId: {
        type: Sequelize.INTEGER,
        reference:{
          model: Center,
          key: 'id'
        }
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return monthlyProgress;
  };