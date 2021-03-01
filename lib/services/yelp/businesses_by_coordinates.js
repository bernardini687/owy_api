const client = require('./client')
const handleErrorMessage = require('./handle_error_message')

const OPTIONAL_FIELDS = ['limit', 'sort_by', 'term']

/**
 * Search for businesses near the given coordinates, by popular categories.
 * An optional term is accepted for more thoughtful queries.
 *
 * @param {number} latitude The latitude of the area of interest.
 * @param {number} longitude The longitude of the area of interest.
 * @param {Object} [options] A collection of optional query parameters to send to Yelp.
 * @returns {Object} The reponse's payload.
 * @throws Will throw an error when the response is unsuccessful.
 */
module.exports = async function businessByCoordinates (latitude, longitude, options = {}) {
  const params = {
    latitude,
    longitude
  }

  OPTIONAL_FIELDS.forEach(field => { addOptionalField(params, field, options) })

  try {
    const { jsonBody } = await client.search(params)

    return jsonBody
  } catch (error) {
    handleErrorMessage(error)
  }
}

function addOptionalField (params, field, options) {
  if (field in options) {
    Object.assign(params, { [field]: options[field] })
  }
}
