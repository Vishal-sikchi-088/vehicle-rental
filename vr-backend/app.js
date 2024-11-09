const express = require('express')
const bodyParser = require('body-parser')
const vehicleRoutes = require('./routes/vehicleRoutes')

const app = express()
app.use(bodyParser.json())

app.use('/api', vehicleRoutes)

module.exports = app;