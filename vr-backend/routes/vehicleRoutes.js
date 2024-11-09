const express = require('express') 
const { getVehicleType, getVehicleModels } = require('../controllers/vehicleController')

const router = express.Router()

router.get('/vehicle-type', getVehicleType)
router.get('/models', getVehicleModels)

module.exports = router