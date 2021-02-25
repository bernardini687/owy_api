const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

it('performs an health check', async done => {
  const response = await request.get('/health')

  expect(response.status).toBe(200)
  expect(response.text).toBe('OK')
  expect(response.body).toStrictEqual({})

  done()
})
