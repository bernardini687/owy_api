module.exports = class ErrorWithResponse extends Error {
  constructor (response) {
    super()

    this.response = response
  }
}
