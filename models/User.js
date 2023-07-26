module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    alamat_no: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    alamat_lengkap: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    alamat_rtrw: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    dev_type: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    dev_model: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    dev_ver: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    user_id: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    app_pin: {
        allowNull: false,
        type: DataTypes.STRING,
        },
    refresh_token: {
        type: DataTypes.TEXT,
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
        tableName: "users",
        });
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Card, {
            as: "userToCard"
        });
        User.hasMany(models.History, {
            as: "userToHistory"
        });
    };
    return User;
}
