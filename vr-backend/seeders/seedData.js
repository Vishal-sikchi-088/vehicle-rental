const { Model } = require('sequelize')
const { sequelize, VehicleType, VehicleModel } = require('../models/index')

async function seedInitialData() {
    await sequelize.sync({force : true})
    console.log('Tables are created in database')

    const carType = await VehicleType.create({ name: 'Car' })
    const bikeType = await VehicleType.create({ name: 'Bike' })

    console.log('Data seeded successfully for Vehicle type')


    await VehicleModel.bulkCreate([
        { name: 'Hatchback', type_id: carType.id, wheels: 4 },
        { name: 'SUV', type_id: carType.id, wheels: 4 },
        { name: 'Cruiser', type_id: bikeType.id, wheels: 2 },
        { name: 'Sports', type_id: bikeType.id, wheels: 2 },
    ])

    console.log('Data seeded successfully for Vehicle model')  
}

module.exports = seedInitialData