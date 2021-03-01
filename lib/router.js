const getHealthRoute = require('./routes/health')
const getCitiesRoute = require('./routes/cities')
const getCityListRoute = require('./routes/city_list')

module.exports = {
  'GET /health': getHealthRoute,
  'GET /cities': getCitiesRoute,
  'GET /city_list': getCityListRoute
}
