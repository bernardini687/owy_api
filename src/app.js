const express = require('express')
const router = require('./router')
const notFound = require('./routes/not_found')

const app = express()

app.use(async (req, res) => {
  const route = `${req.method} ${req.url}`
  const handler = router[route] || notFound

  handler(req, res)
})

module.exports = app
