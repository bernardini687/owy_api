const openWeatherMock = require('../services/open_weather')
const yelpMock = require('../services/yelp')
const supertest = require('supertest')
const app = require('../app')
const { OpenWeatherNotFoundError, OpenWeatherError, YelpError } = require('../errors')
const currentWeatherSuccessResponse = require('../../test/responses/open_weather/current_weather/success')
const businessesByCoordsSuccessResponse = require('../../test/responses/yelp/businesses_by_coordinates/success')

jest.mock('../services/open_weather')
jest.mock('../services/yelp')

const request = supertest(app)

const cityDataset = (function () {
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
})()

describe('when given no city id', () => {
  it('responds with an explicative 400 error', async done => {
    const response = await request.get('/cities')

    expect(response.status).toBe(400)
    expect(response.body).toStrictEqual({ code: 400, message: 'required parameter `ids` is missing' })

    done()
  })
})

describe('when given more than 5 city ids', () => {
  it('responds with an explicative 400 error', async done => {
    const response = await request.get('/cities').query({ ids: [1, 2, 3, 4, 5, 6] })

    expect(response.status).toBe(400)
    expect(response.body).toStrictEqual({ code: 400, message: 'max number of `ids` elements is 5' })

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
    expect(response.body).toStrictEqual(cityDataset)

    done()
  })
})

describe('when given 1 invalid city id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with a 404 error', async done => {
    openWeatherMock.currentWeather.mockImplementationOnce(() =>
      Promise.reject(new OpenWeatherNotFoundError('city not found by id 418'))
    )

    const response = await request.get('/cities').query({ ids: 418 })

    expect(openWeatherMock.currentWeather).toHaveBeenCalledTimes(1)
    expect(openWeatherMock.currentWeather).toHaveBeenCalledWith('418')
    expect(yelpMock.businessesByCoordinates).not.toHaveBeenCalled()

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ code: 404, message: 'city not found by id 418' })

    done()
  })
})

describe('when given 5 valid city ids', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with an array of the city datasets', async done => {
    openWeatherMock.currentWeather.mockImplementation(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    yelpMock.businessesByCoordinates.mockImplementation(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    const response = await request.get('/cities').query({ ids: [1001, 1002, 1003, 1004, 1005] })

    expect(openWeatherMock.currentWeather).toHaveBeenCalledTimes(5)
    expect(openWeatherMock.currentWeather).nthCalledWith(1, '1001')
    expect(openWeatherMock.currentWeather).nthCalledWith(2, '1002')
    expect(openWeatherMock.currentWeather).nthCalledWith(3, '1003')
    expect(openWeatherMock.currentWeather).nthCalledWith(4, '1004')
    expect(openWeatherMock.currentWeather).nthCalledWith(5, '1005')

    const { coord } = currentWeatherSuccessResponse.data

    expect(yelpMock.businessesByCoordinates).toHaveBeenCalledTimes(5)
    expect(yelpMock.businessesByCoordinates).nthCalledWith(1, coord.lat, coord.lon)
    expect(yelpMock.businessesByCoordinates).nthCalledWith(5, coord.lat, coord.lon)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual([
      cityDataset,
      cityDataset,
      cityDataset,
      cityDataset,
      cityDataset
    ])

    done()
  })
})

describe('when given valid and invalid city ids', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with a 404 error', async done => {
    openWeatherMock.currentWeather.mockImplementation(() =>
      Promise.reject(new OpenWeatherNotFoundError('city not found by id 418'))
    )

    yelpMock.businessesByCoordinates.mockImplementation(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    openWeatherMock.currentWeather.mockImplementationOnce(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    const response = await request.get('/cities').query({ ids: [1001, 1002, 1003, 1004, 1005] })

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ code: 404, message: 'city not found by id 418' })

    done()
  })
})

describe('when an error other than `OpenWeatherNotFoundError` occurs from OpenWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with a 502 error', async done => {
    openWeatherMock.currentWeather.mockImplementation(() =>
      Promise.reject(new OpenWeatherError('429: calls limit exceeded'))
    )

    yelpMock.businessesByCoordinates.mockImplementation(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    openWeatherMock.currentWeather.mockImplementationOnce(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    const response = await request.get('/cities').query({ ids: [1001, 1002, 1003] })

    expect(response.status).toBe(502)
    expect(response.body).toStrictEqual({ code: 502, message: "Invalid response from OpenWeather: '429: calls limit exceeded'" })

    done()
  })
})

describe('when an error occurs from Yelp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with a 502 error', async done => {
    yelpMock.businessesByCoordinates.mockImplementation(() =>
      Promise.reject(new YelpError('VALIDATION_ERROR'))
    )

    openWeatherMock.currentWeather.mockImplementation(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    yelpMock.businessesByCoordinates.mockImplementationOnce(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    const response = await request.get('/cities').query({ ids: [1001, 1002, 1003] })

    expect(response.status).toBe(502)
    expect(response.body).toStrictEqual({ code: 502, message: "Invalid response from Yelp: 'VALIDATION_ERROR'" })

    done()
  })
})

describe('for other unknown errors', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with a 500 error', async done => {
    yelpMock.businessesByCoordinates.mockImplementation(() =>
      Promise.reject(new Error('bad things happen'))
    )

    openWeatherMock.currentWeather.mockImplementation(() =>
      Promise.resolve(currentWeatherSuccessResponse.data)
    )

    yelpMock.businessesByCoordinates.mockImplementationOnce(() =>
      Promise.resolve(businessesByCoordsSuccessResponse.jsonBody)
    )

    const response = await request.get('/cities').query({ ids: [1001, 1002, 1003] })

    expect(response.status).toBe(500)
    expect(response.text).toMatch(/bad things happen/)

    done()
  })
})
