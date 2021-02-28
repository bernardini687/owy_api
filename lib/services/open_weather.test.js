const axiosMock = require('axios')
const openWeather = require('./open_weather')
const { OpenWeatherNotFoundError, OpenWeatherError } = require('../errors')
const ErrorWithResponse = require('../../test/common/error_with_response')
const currentWeatherNotFoundResponse = require('../../test/responses/open_weather/current_weather/not_found')
const currentWeatherErrorResponse = require('../../test/responses/open_weather/current_weather/error')
const currentWeatherSuccessResponse = require('../../test/responses/open_weather/current_weather/success')

jest.mock('axios')

describe('currentWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when successful', () => {
    it('fetches data from OpenWeather', async () => {
      axiosMock.get.mockImplementationOnce(() =>
        Promise.resolve(currentWeatherSuccessResponse)
      )

      await expect(openWeather.currentWeather('120120')).resolves.toStrictEqual(currentWeatherSuccessResponse.data)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
      expect(axiosMock.get).toHaveBeenCalledWith(
        `${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`,
        {
          params: {
            id: '120120',
            appid: process.env.OPEN_WEATHER_API_KEY,
            units: 'metric'
          }
        }
      )
    })
  })

  describe('when given an invalid city id', () => {
    it('raises an `OpenWeatherNotFound` error', async () => {
      axiosMock.get.mockImplementationOnce(() =>
        Promise.reject(new ErrorWithResponse(currentWeatherNotFoundResponse))
      )

      await expect(openWeather.currentWeather('418')).rejects.toThrowError(OpenWeatherNotFoundError, /404: city not found/)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })

  describe('upon receiving other OpenWeather errors', () => {
    it('raises an `OpenWeatherError` error with a message from OpenWeather', async () => {
      axiosMock.get.mockImplementationOnce(() =>
        Promise.reject(new ErrorWithResponse(currentWeatherErrorResponse))
      )

      await expect(openWeather.currentWeather('418')).rejects.toThrowError(OpenWeatherError, /429: calls limit exceeded/)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })

  describe('upon receiving other errors', () => {
    it('raises an `OpenWeatherError` error with a message from OpenWeather', async () => {
      axiosMock.get.mockImplementationOnce(() =>
        Promise.reject(new Error('bad things happen'))
      )

      await expect(openWeather.currentWeather('418')).rejects.toThrowError(Error, 'bad things happen')

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })
})
