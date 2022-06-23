'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('users', ['token']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', ['token']);
  }
};
