class CityIdsValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CityIdsValidationError'
  }
}

class OpenWeatherNotFoundError extends Error {
  constructor (message) {
    super(message)
    this.name = 'OpenWeatherNotFoundError'
  }
}

class OpenWeatherError extends Error {
  constructor (message) {
    super(message)
    this.name = 'OpenWeatherError'
  }
}

class YelpError extends Error {
  constructor (message) {
    super(message)
    this.name = 'YelpError'
  }
}

class CityListFilenameError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CityListFilenameError'
  }
}

function errorHandler (err, _req, res, next) {
  const { name, message } = err

  switch (name) {
    case 'CityIdsValidationError':
      res.status(400)
      res.json({ code: 400, message })
      break
    case 'OpenWeatherNotFoundError':
      res.status(404)
      res.json({ code: 404, message })
      break
    case 'CityListFilenameError':
      res.status(500)
      res.json({ code: 500, message })
      break
    case 'OpenWeatherError':
    case 'YelpError':
      res.status(502)
      res.json({ code: 502, message: `Invalid response from ${removeSuffix(name)}: '${message}'` })
      break

    default:
      next(err)
      break
  }
}

function removeSuffix (errorName) {
  return errorName.replace(/Error$/, '')
}

module.exports = {
  CityIdsValidationError,
  OpenWeatherNotFoundError,
  OpenWeatherError,
  YelpError,
  CityListFilenameError,
  errorHandler
}
