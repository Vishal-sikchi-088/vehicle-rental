const { Sequlize } = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequlize(config.development)

module.exports = { sequelize}