const app = require('../app')
const supertest = require('supertest')

const request = supertest(app)

it('gets the test endpoint', async done => {
  const response = await request.get('/health')

  expect(response.status).toBe(200)
  expect(response.text).toBe('OK')
  expect(response.body).toStrictEqual({})

  done()
})
