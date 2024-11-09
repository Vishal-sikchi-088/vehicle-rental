const { Sequelize } = require('sequelize')
const config = require('../config/config')
const VehicleTypeModel = require('./vehicleType')
const VehicleModelModel = require('./vehicleModel')
const BookingModel = require('./booking')

const sequelize = new Sequelize(config.development)
const VehicleType = VehicleTypeModel(sequelize)
const VehicleModel = VehicleModelModel(sequelize)
const Booking = BookingModel(sequelize)

VehicleType.hasMany(VehicleModel, { foreignKey: 'type_id' })
VehicleModel.belongsTo(VehicleType, { foreignKey: 'type_id' })


module.exports = { sequelize }