'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
        nama: 'Toms',
        nip: '18238781',
        email: "tes@mail.com",
        alamat: "asdasdasd",
        no_tlp: "08123123213",
        levelID: "1",
        departmentID: "1",
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('users', null, {});
  }
};
