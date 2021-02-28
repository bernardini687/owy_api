const axios = require('axios')
const handleErrorMessage = require('./handle_error_message')

/**
 * Perform request for current weather data of the city by the given id.
 *
 * @param {string} id The city's id.
 * @returns {Object} The reponse's payload.
 * @throws Will throw an error when the response is unsuccessful.
 */
module.exports = async function currentWeather (id) {
  const url = `${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`

  try {
    const { data } = await axios.get(url, {
      params: {
        id,
        appid: process.env.OPEN_WEATHER_API_KEY,
        units: 'metric'
      }
    })

    return data
  } catch (error) {
    handleErrorMessage(error, id)
  }
}
