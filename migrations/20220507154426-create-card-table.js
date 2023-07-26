'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("card", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cardNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CVV: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardType: {
        allowNull: false,
        type: Sequelize.ENUM("Master", "Visa"),
      },
      Username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        },
      },
      cardExpDate: {
        allowNull: false,
        type: Sequelize.STRING,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("card");
  },
};
