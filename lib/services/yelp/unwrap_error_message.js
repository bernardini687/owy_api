module.exports = function unwrapErrorMessage (error) {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    throw new Error(composeMessage(error.response.body)) // TODO: YelpError
  } else {
    // unknown error

    throw error
  }
}

function composeMessage (body) {
  const { error } = JSON.parse(body)

  return `${error.code}: ${error.description}`
}
