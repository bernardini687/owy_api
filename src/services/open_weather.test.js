jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} }))
}))

const axiosMock = require('axios')
const openWeather = require('./open_weather')
const currentWeatherData = require('../../data/open_weather/current_weather.example')

require('dotenv').config()

describe('currentWeather', () => {
  it('fetches data from OpenWeather', async () => {
    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: currentWeatherData
      })
    )

    const weatherData = await openWeather.currentWeather('120120')

    expect(weatherData).toStrictEqual(currentWeatherData)
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
