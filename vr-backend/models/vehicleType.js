const { DataTypes } = require('sequelize')
// const sequelize = require('./index')

const vechileType = (sequelize) => {
    return sequelize.define('VechileType', {
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

module.exports =  vechileType 