const express = require('express')
require('express-async-errors')
const { OpenWeatherNotFoundError, CityIdsValidationError } = require('./errors')
const notFoundRoute = require('./routes/not_found')
const router = require('./router')

const app = express()

app.use(async (req, res) => {
  const route = `${req.method} ${req.path}`
  const handler = router[route] || notFoundRoute

  const _ = await handler(req, res) // eslint-disable-line no-unused-vars
})

app.use((err, _req, res, next) => {
  if (err instanceof CityIdsValidationError) {
    res.status(400)
    res.send(err.message)
  } else if (err instanceof OpenWeatherNotFoundError) {
    res.status(404)
    res.json({ code: 404, message: err.message })
  }

  next(err)
})

module.exports = app
