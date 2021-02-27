const yelpClientMock = require('./yelp/client')
const yelp = require('./yelp')
const ErrorWithResponse = require('../../test/common/error_with_response')
const businessesByCoordsErrorResponse = require('../../test/responses/yelp/businesses_by_coordinates/error')
const businessesByCoordsSuccessResponse = require('../../test/responses/yelp/businesses_by_coordinates/success')

jest.mock('./yelp/client')

describe('businessesByCoordinates', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when successful', () => {
    beforeAll(() => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.resolve(businessesByCoordsSuccessResponse)
      )
    })

    it('fetches data from Yelp', async () => {
      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).resolves.toStrictEqual(businessesByCoordsSuccessResponse.jsonBody)

      expect(yelpClientMock.apiKey).toBe(process.env.YELP_API_KEY)
      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
      expect(yelpClientMock.search).toHaveBeenCalledWith({ latitude: 46.022, longitude: 8.6793 })
    })
  })

  describe('when unsuccessful', () => {
    beforeAll(() => {
      yelpClientMock.search.mockImplementation(() =>
        Promise.reject(
          new ErrorWithResponse(businessesByCoordsErrorResponse)
        )
      )
    })

    it('raises an error with a message from Yelp', async () => {
      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrowError(/VALIDATION_ERROR: 'Bearer xyz' does not match/)

      expect(yelpClientMock.apiKey).toBe(process.env.YELP_API_KEY)
      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
    })
  })
})
