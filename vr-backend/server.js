const app = require('./app')
const { sequelize } = require('./models/index')

const port = process.env.PORT || 3000

sequelize.authenticate().then( () => {
    console.log('Database has been connected')
    app.listen( port, () => {
        console.log('Server is running on Port', port)
    })
})
