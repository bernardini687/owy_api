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
    it('fetches data from Yelp', async () => {
      yelpClientMock.search.mockImplementationOnce(() =>
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
      yelpClientMock.search.mockImplementationOnce(() =>
        Promise.reject(
          new ErrorWithResponse(businessesByCoordsErrorResponse)
        )
      )

      await expect(yelp.businessesByCoordinates(46.022, 8.6793)).rejects.toThrowError(/VALIDATION_ERROR: 'Bearer xyz' does not match/)

      expect(yelpClientMock.apiKey).toBe(process.env.YELP_API_KEY)
      expect(yelpClientMock.search).toHaveBeenCalledTimes(1)
    })
  })
})
