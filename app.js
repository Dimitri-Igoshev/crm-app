const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const keys = require('./config/keys')

const analyticsRoutes = require('./routes/analytics.routes')
const authRoutes = require('./routes/authorization.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')
const positionRoutes = require('./routes/position.routes')

const app = express()

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(error => console.log(error))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/analytics', analyticsRoutes)
app.use('/api/authorization', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
