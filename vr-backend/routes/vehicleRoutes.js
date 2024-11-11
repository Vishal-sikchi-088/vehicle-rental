const express = require('express') 
const { getVehicleType, getVehicleModels } = require('../controllers/vehicleController')
const { createBooking } = require('../controllers/bookingController')


const router = express.Router()

router.post('/bookings', createBooking)
router.get('/vehicle-type', getVehicleType)
router.get('/models', getVehicleModels)

module.exports = router