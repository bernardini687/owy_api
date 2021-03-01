const Promise = require('bluebird')
const { CityIdsValidationError } = require('../errors')
const openWeather = require('../services/open_weather')
const yelp = require('../services/yelp')

module.exports = async function getCitiesRoute (req, res) {
  if ('ids' in req.query) {
    const { ids, ...otherQueryParams } = req.query

    const response = await dispatchCalls(req.query.ids, otherQueryParams)

    res.json(response)
  } else {
    throw new CityIdsValidationError('required parameter `ids` is missing')
  }
}

async function dispatchCalls (ids, yelpOptions) {
  if (Array.isArray(ids)) {
    if (ids.length > 5) {
      throw new CityIdsValidationError('max number of `ids` elements is 5')
    }

    return Promise.map(ids, id => singleCall(id, yelpOptions))
  }

  return singleCall(ids, yelpOptions)
}

async function singleCall (id, yelpOptions) {
  const { coord, ...currentWeather } = await openWeather.currentWeather(id)
  const { businesses, total } = await yelp.businessesByCoordinates(coord.lat, coord.lon, yelpOptions)

  return {
    businesses,
    total,
    id: currentWeather.id,
    name: currentWeather.name,
    currentWeather: {
      weather: currentWeather.weather,
      main: currentWeather.main,
      visibility: currentWeather.visibility,
      wind: currentWeather.wind,
      clouds: currentWeather.clouds,
      dt: currentWeather.dt,
      sys: currentWeather.sys,
      timezone: currentWeather.timezone
    }
  }
}
