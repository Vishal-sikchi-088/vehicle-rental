const { VehicleType, VehicleModel } = require('../models/index') 

const getAllVehicleTypes = async () => {
    return await VehicleType.findAll() 
} 

const getVehicleModelsByTypeId = async (typeId) => {
    return await VehicleModel.findAll({ where: { type_id: typeId } }) 
} 

module.exports = {
    getAllVehicleTypes,
    getVehicleModelsByTypeId,
} 
