'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rankings', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userUid: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'uid'
        },
        onDelete: 'SET NULL'
      },
      gameMode: {
        type: Sequelize.STRING,
      },
      playCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      winCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rankings')
  }
};
