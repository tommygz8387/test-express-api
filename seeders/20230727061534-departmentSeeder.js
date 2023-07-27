'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('t_department', [
      { departmentName: 'Marketing', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'Logistic', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'Finance', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'HR', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'IT', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'PR', createdAt: new Date(), updatedAt: new Date() },
      { departmentName: 'Legal', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('t_department', null, {});
  }
};
