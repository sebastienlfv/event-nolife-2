const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const Sequelize = require('sequelize')
const cors = require('cors')
const app = express();
dotenv.config()

// import routes
const eventRoutes = require('./routes/evenement')
const userRoutes = require('./routes/user')

// connexion à la BDD
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la BDD");
  }).catch(() => {
  console.log("Connexion à la BDD raté");
})

// CORS
app.use(cors())

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/evenements', eventRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;