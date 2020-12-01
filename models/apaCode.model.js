module.exports = (sequelize, Sequelize) => {
    const apaCode = sequelize.define("apacode", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: Sequelize.STRING
        },
        parent_id: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        }
    });

    return apaCode;
};