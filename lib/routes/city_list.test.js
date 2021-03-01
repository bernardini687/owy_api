const supertest = require('supertest')
const app = require('../app')

// use a smaller file for tests
process.env.OPEN_WEATHER_CITY_LIST_FILENAME = 'city.list.test.json'

const request = supertest(app)

test('returns a list of city names mapped to their id', async done => {
  const response = await request.get('/city_list')

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { foo: 1 },
    { bar: 2 },
    { baz: 3 }
  ])

  done()
})

test('returns a list of city names matching `o`', async done => {
  const response = await request.get('/city_list').query({ q: 'o' })

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { foo: 1 }
  ])

  done()
})

test('returns a list of city names matching `ba`', async done => {
  const response = await request.get('/city_list').query({ q: 'ba' })

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { bar: 2 },
    { baz: 3 }
  ])

  done()
})

test('returns error on invalid filename', async done => {
  process.env.OPEN_WEATHER_CITY_LIST_FILENAME = 'foo'

  const response = await request.get('/city_list')

  expect(response.status).toBe(500)
  expect(response.body).toStrictEqual({
    code: 500,
    message: expect.stringMatching(/foo': 'OPEN_WEATHER_CITY_LIST_FILENAME' might be badly set/)
  })

  done()
})
