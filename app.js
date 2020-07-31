const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const messagesRouter = require('./routes/messages')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/dist')))

// app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/messages', messagesRouter)

module.exports = app