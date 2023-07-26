module.exports = (sequelize, DataTypes) => { 
    const Card = sequelize.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cardNumber: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    CVV: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    cardName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    cardType: {
        allowNull: false,
        type: DataTypes.ENUM("Master", "Visa"),
    },
    Username: {
        allowNull: false,
        type: DataTypes.STRING,
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
    cardExpDate: {
        allowNull: false,
        type: DataTypes.STRING,
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
        tableName: "card",
        });
        Card.associate = function (models) {
            // associations can be defined here
            Card.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                as: "cardToUserID"
            });
            Card.hasMany(models.History, {
                as: "cardToHistory"
            });
        };
    return Card;
}
