'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('t_level', [
      { levelName: 'User', createdAt: new Date(), updatedAt: new Date() },
      { levelName: 'Superuser', createdAt: new Date(), updatedAt: new Date() },
      { levelName: 'Admin', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('t_level', null, {});
  }
};
