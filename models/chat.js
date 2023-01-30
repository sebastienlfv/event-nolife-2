const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

const chatSchema = sequelize.define('chats', {
  _id_room: {
    type: DataTypes.STRING
  },
  sender: DataTypes.STRING,
  receiver: DataTypes.STRING,
  content: DataTypes.STRING
}, { timestamps: false })

const chatModel = sequelize.model('chats', chatSchema)
module.exports = chatModel