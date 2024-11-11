const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const vehicleRoutes = require('./routes/vehicleRoutes')

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use('/api', vehicleRoutes)

module.exports = app;