'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nip: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      no_tlp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      levelID: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "t_level",
          key: "id"
        },
      },
      departmentID: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "t_department",
          key: "id"
        },
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
