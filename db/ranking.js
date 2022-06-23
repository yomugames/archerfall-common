
const sequelize = require("./sequelize")
const Sequelize = require("sequelize")
const base64id = require("base64id")

class Ranking extends Sequelize.Model {
  static async createOne(attributes) {
    return this.create(attributes)
  }

}

Ranking.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userUid: {
    type: Sequelize.STRING,
    references: {
      model: 'users',
      key: 'uid'
    },
    onDelete: 'SET NULL',
    allowNull: true
  },
  gameMode: Sequelize.STRING,
  playCount: Sequelize.INTEGER,
  winCount: Sequelize.INTEGER
},{
  sequelize,
  modelName: 'Ranking',
  tableName: 'rankings',
  freezeTableName: true // prevent pluralization of names
})

module.exports = Ranking