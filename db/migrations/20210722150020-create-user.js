'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      token: Sequelize.STRING,
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      picture: Sequelize.STRING,
      country: Sequelize.STRING,
      trophies: Sequelize.INTEGER,
      coins: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

