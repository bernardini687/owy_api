const axios = require('axios')

async function currentWeather (id) {
  const url = `${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`

  try {
    const response = await axios.get(url, {
      params: {
        id,
        appid: process.env.OPEN_WEATHER_APP_ID,
        units: 'metric'
      }
    })

    return response.data
  } catch (error) {
    // TODO: error handling wrapper (axiosError, !200)
    console.error(error)
  }
}

module.exports = currentWeather
