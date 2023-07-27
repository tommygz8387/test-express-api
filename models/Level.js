module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        levelName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        tableName: "t_level",
    });
    return Level;
}
