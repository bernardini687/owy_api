const axiosMock = require('axios')
const openWeather = require('./open_weather')
const ErrorWithResponse = require('../../test/common/error_with_response')
const currentWeatherErrorResponse = require('../../test/responses/open_weather/current_weather/error')
const currentWeatherSuccessResponse = require('../../test/responses/open_weather/current_weather/success')

jest.mock('axios')

describe('currentWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when successful', () => {
    beforeAll(() => {
      axiosMock.get.mockImplementation(() =>
        Promise.resolve(currentWeatherSuccessResponse)
      )
    })

    it('fetches data from OpenWeather', async () => {
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

  describe('when unsuccessful', () => {
    beforeAll(() => {
      axiosMock.get.mockImplementation(() =>
        Promise.reject(
          new ErrorWithResponse(currentWeatherErrorResponse)
        )
      )
    })

    it('raises an error with a message from OpenWeather', async () => {
      await expect(openWeather.currentWeather('120120')).rejects.toThrowError(/Invalid API key/)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })
})
