const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('when given no city id', () => {
  it('responds with an explicative 400 error', async done => {
    const response = await request.get('/cities')

    expect(response.status).toBe(400)
    expect(response.text).toBe('required parameter `ids` is missing')
    expect(response.body).toStrictEqual({})

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
  xit('responds with that city dataset', () => {})
})

describe('when given 1 invalid city id', () => {
  xit('responds with a 404 error', () => {})
})

describe('when given 5 valid city ids', () => {
  xit('responds with an array of the city datasets', () => {})
})

describe('when given valid and invalid city ids', () => {
  xit('responds with a 404 error indicating the invalid city ids', () => {})
})
