const client = require('./client')
const handleErrorMessage = require('./handle_error_message')

/**
 * Search for businesses near the given coordinates, by popular categories.
 * An optional term is accepted for more thoughtful queries.
 *
 * @param {number} latitude The latitude of the area of interest.
 * @param {number} longitude The longitude of the area of interest.
 * @param {string} [term] The optional term passed over to the Yelp API.
 * @returns {Object} The reponse's payload.
 * @throws Will throw an error when the response is unsuccessful.
 */
module.exports = async function businessByCoordinates (latitude, longitude, term) {
  const params = {
    latitude,
    longitude
  }

  if (term !== undefined) {
    Object.assign(params, { term })
  }

  try {
    const { jsonBody } = await client.search(params)

    return jsonBody
  } catch (error) {
    handleErrorMessage(error)
  }
}

/*

EXTRA:

['term', 'sort_by'].forEach(field, addOptionalField(params, field, options))

function addOptionalField (params, field, options) {
  if (field in options) {
    Object.assign(params, { [field]: options[field] })
  }
}

*/
