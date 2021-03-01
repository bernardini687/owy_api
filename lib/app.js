const express = require('express')
require('express-async-errors')
const { errorHandler } = require('./errors')
const notFoundRoute = require('./routes/not_found')
const router = require('./router')

const app = express()

app.use(async (req, res) => {
  const route = `${req.method} ${req.path}`
  const handler = router[route] || notFoundRoute

  // TODO: remove `const _ = `
  const _ = await handler(req, res) // eslint-disable-line no-unused-vars
})

app.use(errorHandler)

module.exports = app
