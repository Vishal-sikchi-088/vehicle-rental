const express = require('express')
const bodyParser = require('body-parser')
const vehicleRoutes = require('./routes/vehicleRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

const app = express()
app.use(bodyParser.json())

app.use('/api', vehicleRoutes)
app.use('/api', bookingRoutes)

module.exports = app;