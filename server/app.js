const config = require("./utils/config");
const express = require('express')
const cors = require('cors')
const app = express()

if (config.ENV !== "live") {
    app.use(cors())
}

app.use(express.json())
app.use(express.static('dist'))

const middleware = require('./utils/middleware')
app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)

const persons = require('./controllers/persons')
const positions = require('./controllers/positions')
const employees = require('./controllers/employees')
const patients = require('./controllers/patients')
const appointments = require('./controllers/appointments')
const users = require('./controllers/users')
const login = require('./controllers/login')
const access = require('./controllers/access')
const health = require('./controllers/health')

app.use('/api/persons', persons)
app.use('/api/positions', positions)
app.use('/api/employees', employees)
app.use('/api/patients', patients)
app.use('/api/appointments', appointments)
app.use('/api/users', users)
app.use('/login', login)
app.use('/api/access', access)
app.use('/health', health)

app.use(middleware.errorHandler)

module.exports = app