const yelp = require('yelp-fusion')

module.exports = yelp.client(process.env.YELP_API_KEY)
