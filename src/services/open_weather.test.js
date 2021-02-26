const axiosMock = require('axios')
const openWeather = require('./open_weather')
const currentWeatherSuccessData = require('../../data/open_weather/current_weather.success')

// TODO: extract `currentWeatherError` and `AxiosError`

const currentWeatherError = {
  cod: 401,
  message: 'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'
}

class AxiosError extends Error {
  constructor (response) {
    super()

    this.response = response
  }
}

jest.mock('axios')

describe('currentWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when successful', () => {
    beforeAll(() => {
      axiosMock.get.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: currentWeatherSuccessData
        })
      )
    })

    it('fetches data from OpenWeather', async () => {
      await expect(openWeather.currentWeather('120120')).resolves.toStrictEqual(currentWeatherSuccessData)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
      expect(axiosMock.get).toHaveBeenCalledWith(
        `${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`,
        {
          params: {
            id: '120120',
            appid: process.env.OPEN_WEATHER_APP_ID,
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
          new AxiosError({
            status: 401,
            data: currentWeatherError
          })
        )
      )
    })

    it('raises an error with a message from OpenWeather', async () => {
      await expect(openWeather.currentWeather('120120')).rejects.toThrowError(/Invalid API key/)

      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })
})
