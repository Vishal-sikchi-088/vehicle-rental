const { DataTypes } =  require('sequelize')

const vehicleModel = (sequelize) => {
    return sequelize.define('VehicleModel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: sequelize.models.VehicleType,
                key: 'id',
            },
        },
    })
}

module.exports =  vehicleModel 