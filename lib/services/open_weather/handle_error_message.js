const { OpenWeatherNotFoundError, OpenWeatherError } = require('../../errors')

module.exports = function handleErrorMessage (error) {
  if (error.response) {
    // axios received an error response (5xx, 4xx)

    const message = composeMessage(error.response.data)

    switch (error.response.status) {
      case 404:
        throw new OpenWeatherNotFoundError(message)
      default:
        throw new OpenWeatherError(message)
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
