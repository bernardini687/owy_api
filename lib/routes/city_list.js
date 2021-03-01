const fs = require('fs')
const es = require('event-stream')
const JSONStream = require('JSONStream')
const path = require('path')
const { CityListFilenameError } = require('../errors')

module.exports = async function getCityListRoute (req, res) {
  let query

  if ('q' in req.query) {
    query = new RegExp(req.query.q, 'i')
  }

  // downloaded from: http://bulk.openweathermap.org/sample/
  const filepath = path.join(__dirname, process.env.OPEN_WEATHER_CITY_LIST_FILENAME || 'city.list.min.json')

  if (fs.existsSync(filepath)) {
    res.type('json')

    fs.createReadStream(filepath)
      .pipe(JSONStream.parse('*'))
      .pipe(es.filterSync(data => query === undefined || query.test(data.name)))
      .pipe(es.mapSync(data => ({ [data.name]: data.id })))
      .pipe(JSONStream.stringify('[', ',', ']'))
      .pipe(res)
  } else {
    throw new CityListFilenameError(`no such file '${filepath}': 'OPEN_WEATHER_CITY_LIST_FILENAME' might be badly set`)
  }
}
