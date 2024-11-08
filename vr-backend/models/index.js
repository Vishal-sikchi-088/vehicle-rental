const { Sequelize } = require('sequelize')
const config = require('../config/config')
const VechileTypeModel = require('./vehicleType')

const sequelize = new Sequelize(config.development)
const VechileType = VechileTypeModel(sequelize);


module.exports = { sequelize }