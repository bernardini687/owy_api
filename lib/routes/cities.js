const { CityIdsValidationError } = require('../errors')

module.exports = async function getCitiesRoute (req, res) {
  if ('ids' in req.query) {
    dispatchCalls(req.query.ids)

    res.sendStatus(200)
  } else {
    throw new CityIdsValidationError('required parameter `ids` is missing')
  }
}

function dispatchCalls (ids) {
  if (Array.isArray(ids)) {
    if (ids.length > 5) {
      throw new CityIdsValidationError('max number of `ids` elements is 5')
    }
  }
}
