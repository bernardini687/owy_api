module.exports = function unwrapErrorMessage (error) {
  if (error.response) {
    // axios received an error response (5xx, 4xx)

    throw new Error(error.response.data.message)
  } else if (error.request) {
    // axios never received a response, or request never left

    throw new Error(error.message) // TODO: additional info?
  } else {
    // not an axios error

    throw error
  }
}
