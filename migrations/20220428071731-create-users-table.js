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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alamat_no: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      alamat_lengkap: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alamat_rtrw: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dev_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dev_model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dev_ver: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      app_pin: {
        allowNull: false,
        type: Sequelize.STRING,
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
