const yelpClientMock = require('./yelp/client')
const yelp = require('./yelp')
const { YelpError } = require('../errors')
const ErrorWithResponse = require('../../test/common/error_with_response')
const businessesByCoordsErrorResponse = require('../../test/responses/yelp/businesses_by_coordinates/error')
const businessesByCoordsSuccessResponse = require('../../test/responses/yelp/businesses_by_coordinates/success')

jest.mock('./yelp/client')

describe('businessesByCoordinates', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when successful', () => {
    it('fetches data from Yelp', async () => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.resolve(businessesByCoordsSuccessResponse)
      )

      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).resolves.toStrictEqual(businessesByCoordsSuccessResponse.jsonBody)

      expect(yelpClientMock.apiKey).toBe(process.env.YELP_API_KEY)
      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793 })
    })
  })

  describe('when unsuccessful', () => {
    it('raises an error with a message from Yelp', async () => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.reject(new ErrorWithResponse(businessesByCoordsErrorResponse))
      )

      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrow(YelpError)
      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrow(/VALIDATION_ERROR: 'Bearer xyz' does not match/)
    })
  })

  describe('upon receiving other errors', () => {
    it('lets them flow', async () => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.reject(new Error('bad things happen'))
      )

      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrow(Error)
      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrow('bad things happen')
    })
  })

  describe('when given correct optional parameters', () => {
    beforeEach(() => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.resolve(businessesByCoordsSuccessResponse)
      )
    })

    it('passes `term` to Yelp', async () => {
      await yelp.businessesByCoordinates(46.022, 8.6793, { term: 'pizza' })

      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793, term: 'pizza' })
    })

    it('passes `limit` to Yelp', async () => {
      await yelp.businessesByCoordinates(46.022, 8.6793, { limit: 7 })

      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793, limit: 7 })
    })

    it('passes `sort_by` to Yelp', async () => {
      await yelp.businessesByCoordinates(46.022, 8.6793, { sort_by: 'distance' })

      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793, sort_by: 'distance' })
    })

    it('passes only available options to Yelp', async () => {
      await yelp.businessesByCoordinates(46.022, 8.6793, { term: 'pizza', limit: 7, sort_by: 'distance', foo: 'bar' })

      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793, sort_by: 'distance', term: 'pizza', limit: 7 })
    })
  })
})
