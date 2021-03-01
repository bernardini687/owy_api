const getHealthRoute = require('./routes/health')
const getCitiesRoute = require('./routes/cities')
const getIdsRoute = require('./routes/ids')

module.exports = {
  'GET /health': getHealthRoute,
  'GET /cities': getCitiesRoute,
  'GET /ids': getIdsRoute
}
