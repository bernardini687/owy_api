const express = require('express')
const notFoundRoute = require('./routes/not_found')
const router = require('./router')

const app = express()

app.use(async (req, res) => {
  const route = `${req.method} ${req.url}`
  const handler = router[route] || notFoundRoute

  handler(req, res)
})

module.exports = app
