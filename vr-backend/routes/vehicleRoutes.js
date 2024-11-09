const express = require('express') 
const { getVehicleType } = require('../controllers/vehicleController')

const router = express.Router()

router.get('/vehicle-type', getVehicleType)

module.exports = router