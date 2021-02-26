module.exports = class AxiosError extends Error {
  constructor (response) {
    super()

    this.response = response
  }
}
