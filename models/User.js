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
    nip: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
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
    alamat: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    no_tlp: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    levelID: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: "t_level",
            key: "id"
        },
    },
    departmentID: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: "t_department",
            key: "id"
        },
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
        User.hasOne(models.Level, {
            foreignKey: "id",
            onDelete: "CASCADE",
        });
        User.belongsTo(models.Level, {
            foreignKey: "levelID",
            onDelete: "CASCADE",
            as: "userToLevel"
        });
        User.belongsTo(models.Department, {
            foreignKey: "departmentID",
            onDelete: "CASCADE",
            as: "userToDepartment"
        });
    };
    return User;
}
