const client = require('./client')

/**
 * Search for businesses according to popular categories around the given coordinates.
 * An optional term is accepted for more precise queries.
 *
 * @param {number} latitude The latitude of the area of interest.
 * @param {number} longitude The longitude of the area of interest.
 * @param {string} [term] The optional term passed over to the Yelp API.
 * @returns {Object} The reponse's payload.
 * @throws Will throw an error when the response is unsuccessful.
 */
module.exports = function searchByCoordinates (latitude, longitude, term) {
  const searchRequest = {
    latitude,
    longitude
  }

  if (term !== undefined) {
    Object.assign(searchRequest, { term })
  }

  client.search(searchRequest).then(response => {
    console.log(response.jsonBody)
    // console.log(response.jsonBody.businesses[0].name)
  }).catch(e => {
    console.log(e)
  })
}

/*

['term', 'sort_by'].forEach(field, addOptionalField(searchRequest, field, options))

function addOptionalField (searchRequest, field, options) {
  if (field in options) {
    Object.assign(searchRequest, { [field]: options[field] })
  }
}

*/
