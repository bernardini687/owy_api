const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('when given no city id', () => {
  xit('responds with an explicative 400 error', () => {})
})

describe('when more than 5 city ids', () => {
  xit('responds with an explicative 400 error', () => {})
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
