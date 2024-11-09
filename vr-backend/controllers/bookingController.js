const { Booking, VehicleModel } = require('../models/index')
const { Op } = require('sequelize')

const createBooking = async (req, res) => {
    const { user_name, vehicle_model_id, start_date, end_date } = req.body

    try {
        // Check if the vehicle model exists in the database
        const vehicleModel = await VehicleModel.findByPk(vehicle_model_id)
        if (!vehicleModel) {
            return res.status(400).json({ message: 'Vehicle model does not exist.' })
        }

        const overlappingBookings = await Booking.findOne({
            where: {
              vehicle_model_id,
              [Op.or]: [
                {
                  start_date: { [Op.between]: [start_date, end_date] },
                },
                {
                  end_date: { [Op.between]: [start_date, end_date] },
                },
              ],
            },
        })
        
        if (overlappingBookings) {
            return res.status(400).json({ message: 'Vehicle is already booked for these dates.' })
        }

        const booking = await Booking.create({ user_name, vehicle_model_id, start_date, end_date })
        res.status(201).json(booking)

    } catch (error) {
        res.status(500).json({ error: 'Failed to create the booking of vehicle' })
    }


}

module.exports = {createBooking}