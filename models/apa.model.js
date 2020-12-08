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
      best: {
        type: Sequelize.DOUBLE
      },
      otiUttam: {
        type: Sequelize.DOUBLE
      },
      uttam: {
        type: Sequelize.DOUBLE
      },
      cholti: {
        type: Sequelize.DOUBLE
      },
      below: {
        type: Sequelize.DOUBLE
      },
      firstThree: {
        type: Sequelize.DOUBLE
      },
      secondThree: {
        type: Sequelize.DOUBLE
      },
      thirdThree: {
        type: Sequelize.DOUBLE
      },
      fourthThree: {
        type: Sequelize.DOUBLE
      },
      total: {
        type: Sequelize.DOUBLE
      },
      percentage: {
        type: Sequelize.DOUBLE
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