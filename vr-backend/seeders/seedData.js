const { Model } = require('sequelize')
const { sequelize, VehicleType, VehicleModel } = require('../models/index')

async function seedInitialData() {
    await sequelize.sync({force : true})
    console.log('Tables are created in database')

    // const carType = await VehicleType.create({ name: 'Car' })
    // const bikeType = await VehicleType.create({ name: 'Bike' })
    const VehicleTypes = await VehicleType.bulkCreate([
        { name: 'SUV', wheels: 4 },
        { name: 'Sedan', wheels: 4 },
        { name: 'Sports', wheels: 2 },
        { name: 'Cruise', wheels: 2 },
        { name: 'Hatchback', wheels: 4 },
    ])

    console.log('Data seeded successfully for Vehicle type')

    const vehicleTypeMap = {}
    VehicleTypes.forEach(vehicleType => {
        vehicleTypeMap[vehicleType.name] = vehicleType.id
    })

    await VehicleModel.bulkCreate([
        { name: 'Model X', type_id: vehicleTypeMap['SUV'] },
        { name: 'Model S', type_id: vehicleTypeMap['Sedan'] },
        { name: 'Roadster', type_id: vehicleTypeMap['Sports'] },
        { name: 'Classic', type_id: vehicleTypeMap['Cruise'] },
        { name: 'Model H', type_id: vehicleTypeMap['Hatchback'] },
    ])

    console.log('Data seeded successfully for Vehicle model')  
}

module.exports = seedInitialData