const { YelpError } = require('../../errors')

module.exports = function handleErrorMessage (error) {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    throw new YelpError(composeMessage(error.response.body))
  } else {
    // unknown error

    throw error
  }
}

function composeMessage (body) {
  const { error } = JSON.parse(body)

  return `${error.code}: ${error.description}`
}
