module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        departmentName: {
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
        tableName: "t_department",
    });
    Department.associate = function (models) {
        // associations can be defined here
        Department.hasMany(models.User, {
            as: "DepartmentToUser",
        });
    };
    return Department;
}
