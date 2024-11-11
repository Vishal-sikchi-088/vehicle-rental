const bookingService = require('../services/bookingService') 

const createBooking = async (req, res) => {
    const { user_name, vehicle_model_id, start_date, end_date } = req.body 

    if (!user_name || !vehicle_model_id || !start_date || !end_date) {
        return res.status(400).json({ message: 'All fields (user_name, vehicle_model_id, start_date, end_date) are required.' }) 
    }

    if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
        return res.status(400).json({ message: 'Invalid date format.' }) 
    }

    try {
        const vehicleModel = await bookingService.findVehicleModelById(vehicle_model_id) 
        if (!vehicleModel) {
            return res.status(400).json({ message: 'Vehicle model does not exist.' }) 
        }

        const overlappingBookings = await bookingService.isVehicleAvailable(vehicle_model_id, start_date, end_date) 
        if (overlappingBookings) {
            return res.status(400).json({ bookingStatus: false, message: 'Vehicle is already booked for these dates.' }) 
        }

        const booking = await bookingService.createBooking(user_name, vehicle_model_id, start_date, end_date)
        booking.dataValues.bookingStatus = true
        booking.dataValues.message = 'Booking completed!! Enjoy your ride :)'
        res.status(201).json(booking)
    } catch (error) {
        res.status(500).json({ bookingStatus: false, error: 'Failed to create the booking of vehicle' })
    }
}

module.exports = { createBooking }
