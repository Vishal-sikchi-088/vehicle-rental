const vehicleService = require('../services/vehicleService') 

const getVehicleType = async (req, res) => {
    try {
        const types = await vehicleService.getAllVehicleTypes() 
        res.json(types) 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicle types' }) 
    }
} 

const getVehicleModels = async (req, res) => {
    try {
        const { typeId } = req.query 

        if (!typeId || isNaN(typeId)) {
            return res.status(400).json({ error: 'Invalid typeId. It must be a number.' }) 
        }

        const models = await vehicleService.getVehicleModelsByTypeId(typeId) 
        res.json(models) 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicle models' }) 
    }
} 

module.exports = { getVehicleType, getVehicleModels } 
