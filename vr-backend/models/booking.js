const { DataTypes } = require('sequelize')


const booking = (sequelize) => {
    return sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicle_model_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'VehicleModels',
                key: 'id',
            }
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    })
}

module.exports =  booking 