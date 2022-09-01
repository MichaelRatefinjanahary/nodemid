require('dotenv').config()

const app = require('./src/app')
const sequelize = require('./src/config/database')

sequelize.sync()

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log('App is running')
})