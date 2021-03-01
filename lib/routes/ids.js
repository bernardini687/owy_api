const { createReadStream } = require('fs')
const es = require('event-stream')
const JSONStream = require('JSONStream')
const path = require('path')

module.exports = async function getIdsRoute (req, res) {
  let query

  if ('q' in req.query) {
    // check for valid regex
    query = new RegExp(req.query.q, 'i')

    // TODO: throw QueryValidationError()
  }

  // downloaded from: http://bulk.openweathermap.org/sample/
  const filepath = path.join(__dirname, process.env.OPEN_WEATHER_CITY_LIST_FILENAME || 'city.list.min.json')
  const readStream = createReadStream(filepath)

  // TODO: throw CityListFilenameError()

  res.type('json')

  readStream
    .pipe(JSONStream.parse('*'))
    .pipe(es.filterSync(data => query === undefined || query.test(data.name)))
    .pipe(es.mapSync(data => ({ [data.name]: data.id })))
    .pipe(JSONStream.stringify('[', ',', ']'))
    .pipe(res)
}
