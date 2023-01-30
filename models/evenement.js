const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

const evenementSchema = sequelize.define('evenements', {
  eventName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventLongDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventMaxParticipant: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  eventPicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  eventParticipant: {
    type: [],
    defaultValue: '[]'
  }
}, {timestamps: false})

const eventModel = sequelize.model('evenements', evenementSchema)
module.exports = eventModel