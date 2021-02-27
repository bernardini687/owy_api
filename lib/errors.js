class CityIdsValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CityIdsValidationError'
  }
}

module.exports = {
  CityIdsValidationError
}
