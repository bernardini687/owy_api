const app = require('../app')
const supertest = require('supertest')

const request = supertest(app)

it('handles undefined GET routes', async done => {
  const response = await request.get('/foo')

  expect(response.status).toBe(404)
  expect(response.text).toBe('Not Found')
  expect(response.body).toStrictEqual({})

  done()
})

it('handles undefined POST routes', async done => {
  const response = await request.post('/bar')

  expect(response.status).toBe(404)
  expect(response.text).toBe('Not Found')
  expect(response.body).toStrictEqual({})

  done()
})
