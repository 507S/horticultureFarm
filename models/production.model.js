module.exports = (sequelize, Sequelize) => {
    const production = sequelize.define("production", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        jan: {
            type: Sequelize.STRING
        },
        feb: {
            type: Sequelize.STRING
        },
        mar: {
            type: Sequelize.STRING
        },
        apr: {
            type: Sequelize.STRING
        },
        may: {
            type: Sequelize.STRING
        },
        jun: {
            type: Sequelize.STRING
        },
        jul: {
            type: Sequelize.STRING
        },
        aug: {
            type: Sequelize.STRING
        },
        sep: {
            type: Sequelize.STRING
        },
        oct: {
            type: Sequelize.STRING
        },
        nov: {
            type: Sequelize.STRING
        },
        dec: {
            type: Sequelize.STRING
        }
    });

    return production;
};