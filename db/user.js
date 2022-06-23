const sequelize = require("./sequelize")
const Sequelize = require("sequelize")
const base64id = require("base64id")
const Level = require("./level")
const Ranking = require("./ranking")

class User extends Sequelize.Model {
  static async validateCreate(attributes) {
    let user

    user = await this.findOne({ where: { uid: attributes.uid } })
    if (user) {
      return `uid is already taken`
    }
  }

  static async isUsernameTaken(name) {
    let user = await this.findOne({ where: { name: name } })
    if (user) {
      return true
    }

    return false
  }

  static async createOne(attributes) {
    let error = await this.validateCreate(attributes)
    if (error) {
      return Promise.resolve({ error: error })
    }

    let token = await this.generateToken()
    attributes.token = token

    return this.create(attributes)
  }

  static generateToken() {
    let token = base64id.generateId()

    return this.findOne({ where: { token: token } })
                .then(function(user){
      const isUserTokenTaken = user !== null
      if (isUserTokenTaken) {
        return this.generateToken()
      } else {
        return Promise.resolve(token)
      }
    })
  }


  getPublicData() {
    let data = this.toJSON()

    delete data["email"]
    delete data["token"]
    delete data["coins"]
    delete data["createdAt"]
    delete data["updatedAt"]

    return data
  }

  getPersonalData() {
    let data = this.toJSON()

    delete data["token"]
    delete data["createdAt"]
    delete data["country"]
    delete data["updatedAt"]

    return data
  }
}

User.init({
  uid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  email: Sequelize.STRING,
  token: Sequelize.STRING,
  name: Sequelize.STRING,
  country: Sequelize.STRING,
  picture: Sequelize.STRING,
  trophies: Sequelize.INTEGER,
  coins: Sequelize.INTEGER
},{
  sequelize,
  modelName: 'User',
  tableName: 'users',
  freezeTableName: true // prevent pluralization of names
})

Level.belongsTo(User, {
  foreignKey: 'creatorUid',
  as: 'creator'
})

Ranking.belongsTo(User, {
  foreignKey: 'userUid',
  as: 'user'
})

User.hasMany(Level, {
  foreignKey: 'creatorUid',
  as: 'saves'
})

User.hasMany(Ranking, {
  foreignKey: 'userUid',
  as: 'rankings'
})


module.exports = User