const Sequelize = require('sequelize')

const storage = process.env.NODE_ENV === 'test' ? process.env.STORAGE_TEST : process.env.STORAGE

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  dialect: process.env.DIALECT,
  storage,
  logging: false,
})

module.exports = sequelize
