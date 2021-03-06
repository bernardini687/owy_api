const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

test('handle undefined GET routes', async done => {
  const response = await request.get('/foo')

  expect(response.status).toBe(404)
  expect(response.text).toBe('Not Found')
  expect(response.body).toStrictEqual({})

  done()
})

test('handle undefined POST routes', async done => {
  const response = await request.post('/bar')

  expect(response.status).toBe(404)
  expect(response.text).toBe('Not Found')
  expect(response.body).toStrictEqual({})

  done()
})
