const { VehicleType } = require('../models/index')

const getVehicleType = async (req, res) => {
    try {
        const types = await VehicleType.findAll()
        res.json(types)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicle types' })
    }
}

module.exports = { getVehicleType }
