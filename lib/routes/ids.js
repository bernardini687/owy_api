const { createReadStream } = require('fs')
const es = require('event-stream')
const JSONStream = require('JSONStream')
const path = require('path')

module.exports = async function getIdsRoute (req, res) {
  // if ('q' in req.query) {
  //   // check for valid regex
  // }

  // downloaded from: http://bulk.openweathermap.org/sample/
  const filepath = path.join(__dirname, process.env.OPEN_WEATHER_CITY_LIST_FILENAME || 'city.list.min.json')

  res.type('json')

  createReadStream(filepath)
    .pipe(JSONStream.parse('*'))
    .pipe(es.filterSync(data => req.query.q === undefined || new RegExp(req.query.q, 'i').test(data.name)))
    .pipe(es.mapSync(data => ({ [data.name]: data.id })))
    .pipe(JSONStream.stringify('[', ',', ']'))
    .pipe(res)
}
