module.exports = (sequelize, DataTypes) => { 
    const History = sequelize.define('History', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: "users",
            key: "id"
        },
    },
    cardID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: "card",
            key: "id"
        },
    },
    Merchant: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    Success: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    },{
        tableName: "history",
        });
    History.associate = function (models) {
        // associations can be defined here
        History.belongsTo(models.User, {
            foreignKey: "userID",
            onDelete: "CASCADE",
            as: "historyToUserID",
        });
        History.belongsTo(models.Card, {
            foreignKey: "cardID",
            onDelete: "CASCADE",
            as: "historyToCardID",
        });
    };
    return History;
}
