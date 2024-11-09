const { VehicleType, VehicleModel } = require('../models/index')

const getVehicleType = async (req, res) => {
    try {
        const types = await VehicleType.findAll()
        res.json(types)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicle types' })
    }
}

const getVehicleModels = async (req, res) => {
    try {
        const {typeId}   = req.query
        const models = await VehicleModel.findAll({where: {type_id: typeId}})
        res.json(models)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicle models' })
    }
}

module.exports = { getVehicleType, getVehicleModels }
