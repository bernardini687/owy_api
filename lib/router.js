const getHealthRoute = require('./routes/health')
const getCitiesRoute = require('./routes/cities')

module.exports = {
  'GET /health': getHealthRoute,
  'GET /cities': getCitiesRoute
}
