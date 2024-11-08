const { DataTypes } = require('sequelize')

const vehicleType = (sequelize) => {
    return sequelize.define('VehicleType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

module.exports =  vehicleType 