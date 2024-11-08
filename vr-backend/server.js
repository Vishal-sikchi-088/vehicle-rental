const app = require('./app')
const { sequelize } = require('./models/index')

const port = process.env.PORT || 3000

sequelize.authenticate().then( async () => {
    console.log('Database has been connected')

    await sequelize.sync({ force: true })
    console.log('table created')
    
    app.listen( port, () => {
        console.log('Server is running on Port', port)
    })
})
