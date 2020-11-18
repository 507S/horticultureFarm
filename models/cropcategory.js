module.exports = (sequelize, Sequelize) => {
    const cropcategory = sequelize.define("cropcategory", {
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

    return cropcategory;
};