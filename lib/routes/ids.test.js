const supertest = require('supertest')
const app = require('../app')

// use a smaller file for tests
process.env.OPEN_WEATHER_CITY_LIST_FILENAME = 'city.list.test.json'

const request = supertest(app)

test('returns a list of city names mapped to their id', async done => {
  const response = await request.get('/ids')

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { foo: 1 },
    { bar: 2 },
    { baz: 3 }
  ])

  done()
})

test('returns a list of city names matching `o`', async done => {
  const response = await request.get('/ids').query({ q: 'o' })

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { foo: 1 }
  ])

  done()
})

test('returns a list of city names matching `ba`', async done => {
  const response = await request.get('/ids').query({ q: 'ba' })

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([
    { bar: 2 },
    { baz: 3 }
  ])

  done()
})

test.todo('returns error on invalid `q` query param')

test.todo('returns error on invalid filename')
