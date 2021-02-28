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

module.exports = {
  CityIdsValidationError,
  OpenWeatherNotFoundError,
  OpenWeatherError
}
