module.exports = (sequelize, Sequelize) => {
    const apa = sequelize.define("apa", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      uddessho: {
        type: Sequelize.STRING
      },
      maan: {
        type: Sequelize.STRING
      },
      work: {
        type: Sequelize.STRING
      },
      shuchok: {
        type: Sequelize.STRING
      },
      ekok: {
        type: Sequelize.STRING
      },
      shuchokMaan: {
        type: Sequelize.STRING
      },
      achievement1: {
        type: Sequelize.STRING
      },
      achievement2: {
        type: Sequelize.STRING
      },
      best: {
        type: Sequelize.STRING
      },
      otiUttam: {
        type: Sequelize.STRING
      },
      uttam: {
        type: Sequelize.STRING
      },
      cholti: {
        type: Sequelize.STRING
      },
      below: {
        type: Sequelize.STRING
      },
      firstThree: {
        type: Sequelize.STRING
      },
      secondThree: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      center_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return apa;
  };