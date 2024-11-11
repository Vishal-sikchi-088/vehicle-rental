// bookingService.js
const { Booking, VehicleModel } = require('../models/index')
const { Op } = require('sequelize')

const isVehicleAvailable = async (vehicle_model_id, start_date, end_date) => {
    return await Booking.findOne({
        where: {
            vehicle_model_id,
            [Op.or]: [
                { start_date: { [Op.between]: [start_date, end_date] } },
                { end_date: { [Op.between]: [start_date, end_date] } },
            ],
        },
    })
}

const createBooking = async (user_name, vehicle_model_id, start_date, end_date) => {
    return await Booking.create({ user_name, vehicle_model_id, start_date, end_date })
}

const findVehicleModelById = async (vehicle_model_id) => {
    return await VehicleModel.findByPk(vehicle_model_id)
}

module.exports = {
    isVehicleAvailable,
    createBooking,
    findVehicleModelById,
}
