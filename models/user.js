const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

const userSchema = sequelize.define('users', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      min: 3,
      max: 15,
      notEmpty: true
    }
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3,
      max: 15,
      notEmpty: true
    }
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3,
      max: 15,
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.NUMBER,
    defaultValue: '0'
  }
}, {timestamps: false})

const userModel = sequelize.model('users', userSchema)
module.exports = userModel