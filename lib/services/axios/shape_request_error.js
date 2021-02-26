/**
 * Handle the [enhanced error](https://github.com/axios/axios/blob/master/lib/core/enhanceError.js) thrown by an axios request.
 *
 * @param {Error} error The enhanced error.
 * @throws Will throw an error with minimal noise.
 */
module.exports = function shapeRequestError (error) {
  if (error.response) {
    // axios received an error response (5xx, 4xx)

    throw new Error(error.response.data.message)
  } else if (error.request) {
    // axios never received a response, or request never left

    throw new Error(error.message)
  } else {
    // not an axios error

    throw error
  }
}
