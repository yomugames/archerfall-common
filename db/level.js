const sequelize = require("./sequelize")
const Sequelize = require("sequelize")
const base64id = require("base64id")

class Level extends Sequelize.Model {
  static async createOne(attributes) {
    let token = await this.generateToken()
    attributes.uid = token

    return this.create(attributes)
  }

  static generateToken() {
    let token = base64id.generateId()

    return this.findOne({ where: { uid: token } })
                .then(function(model){
      const isTokenTaken = model !== null
      if (isTokenTaken) {
        return this.generateToken()
      } else {
        return Promise.resolve(token)
      }
    })
  }

  getPublicData() {
    let data = this.toJSON()

    data.thumbnail = data.thumbnail.toString()
    try {
      data.data = JSON.parse(data.data.toString())
    } catch(e) {
      data.data = {}
    }

    return data
  }
}

Level.init({
  uid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  creatorUid: Sequelize.STRING,
  isFeatured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  rating: {
    type: Sequelize.TINYINT,
    defaultValue: 0
  },
  upvoteCount: {
    type: Sequelize.SMALLINT,
    defaultValue: 0
  },
  downvoteCount: {
    type: Sequelize.SMALLINT,
    defaultValue: 0
  },
  data: Sequelize.BLOB,
  thumbnail: Sequelize.BLOB
},{
  sequelize,
  modelName: 'Level',
  tableName: 'levels',
  freezeTableName: true // prevent pluralization of names
})

module.exports = Level