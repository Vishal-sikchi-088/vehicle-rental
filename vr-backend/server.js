const app = require('./app')
const { sequelize } = require('./models/index')
const seedInitialData = require('./seeders/seedData')

const port = process.env.PORT || 3005

sequelize.authenticate().then(async () => {
    console.log('Database has been connected')

    try {
        await seedInitialData()
        console.log('Tables are created and initial data has been added')
    } catch (error) {
        console.error(error.message)
    }

    app.listen(port, () => {
        console.log('Server is running on Port', port)
    })
}).catch((error) => {
    console.error('Unable to connect to the database:', error.message)
})

