const { OpenWeatherNotFoundError, OpenWeatherError } = require('../../errors')

module.exports = function handleErrorMessage (error, id) {
  if (error.response) {
    // axios received an error response (5xx, 4xx)

    switch (error.response.status) {
      case 404:
        throw new OpenWeatherNotFoundError(`city not found by id ${id}`)
      default:
        throw new OpenWeatherError(composeMessage(error.response.data))
    }
  } else if (error.request) {
    // axios never received a response, or request never left

    throw new Error(error.message) // TODO: additional info?
  } else {
    // not an axios error

    throw error
  }
}

function composeMessage (body) {
  const { cod, message } = body

  return `${cod}: ${message}`
}
