'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('levels', { 
      uid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: Sequelize.STRING,
      creatorUid: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'uid'
        },
        onDelete: 'SET NULL'
      },
      isFeatured: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      isPrivate: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      rating: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      downvoteCount: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      upvoteCount: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      data: Sequelize.BLOB,
      thumbnail: Sequelize.BLOB,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('levels')
  }
};
