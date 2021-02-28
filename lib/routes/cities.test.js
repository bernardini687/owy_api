const openWeatherMock = require('../services/open_weather')
const yelpMock = require('../services/yelp')
const supertest = require('supertest')
const app = require('../app')
const { OpenWeatherNotFoundError } = require('../errors')
const currentWeatherSuccessResponse = require('../../test/responses/open_weather/current_weather/success')
const businessesByCoordsSuccessResponse = require('../../test/responses/yelp/businesses_by_coordinates/success')

jest.mock('../services/open_weather')
jest.mock('../services/yelp')

const request = supertest(app)

const cityDataset = () => {
  const { weather, main, visibility, wind, clouds, dt, sys, timezone, id, name } = currentWeatherSuccessResponse.data
  const { businesses, total } = businessesByCoordsSuccessResponse.jsonBody

  return {
    businesses,
    total,
    id,
    name,
    currentWeather: {
      weather,
      main,
      visibility,
      wind,
      clouds,
      dt,
      sys,
      timezone
    }
  }
}

describe('when given no city id', () => {
  it('responds with an explicative 400 error', async done => {
    const response = await request.get('/cities')

    expect(response.status).toBe(400)
    expect(response.text).toBe('required parameter `ids` is missing')
    expect(response.body).toStrictEqual({}) // TODO: { code: 400, message: '' } (`text` is just the raw response!)

    done()
  })
})

describe('when given more than 5 city ids', () => {
  it('responds with an explicative 400 error', async done => {
    const response = await request.get('/cities').query({ ids: [1, 2, 3, 4, 5, 6] })

    expect(response.status).toBe(400)
    expect(response.text).toBe('max number of `ids` elements is 5')
    expect(response.body).toStrictEqual({})

    done()
  })
})

describe('when given 1 valid city id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with that city dataset', async done => {
    openWeatherMock.currentWeather.mockImplementationOnce(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    yelpMock.businessesByCoordinates.mockImplementationOnce(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    const response = await request.get('/cities').query({ ids: 120120 })

    expect(openWeatherMock.currentWeather).toHaveBeenCalledTimes(1)
    expect(openWeatherMock.currentWeather).toHaveBeenCalledWith('120120')

    const { coord } = currentWeatherSuccessResponse.data

    expect(yelpMock.businessesByCoordinates).toHaveBeenCalledTimes(1)
    expect(yelpMock.businessesByCoordinates).toHaveBeenCalledWith(coord.lat, coord.lon)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(cityDataset())

    done()
  })
})

describe('when given 1 invalid city id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  xit('responds with a 404 error', async done => {
    openWeatherMock.currentWeather.mockImplementationOnce(() =>
      Promise.reject(new OpenWeatherNotFoundError('404: city not found'))
    )

    const response = await request.get('/cities').query({ ids: 418 })

    expect(openWeatherMock.currentWeather).toHaveBeenCalledTimes(1)
    expect(openWeatherMock.currentWeather).toHaveBeenCalledWith('418')
    expect(yelpMock.businessesByCoordinates).not.toHaveBeenCalled()

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ code: 404, message: 'city not found' })

    done()
  })
})

describe('when given 5 valid city ids', () => {
  xit('responds with an array of the city datasets', () => { })
})

describe('when given valid and invalid city ids', () => {
  xit('responds with a 404 error indicating the invalid city ids', () => { })
})
