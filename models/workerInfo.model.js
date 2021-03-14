module.exports = (sequelize, Sequelize) => {
    const workerInfo = sequelize.define("workerinfo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      podobi: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      regularWorker: {
        type: Sequelize.INTEGER
      },
      irregularWorker: {
        type: Sequelize.INTEGER
      },
     
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return workerInfo;
  };