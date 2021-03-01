![](https://github.com/bernardini687/owy_api/workflows/CI/badge.svg)

# OpenWeatherYelp API

## environment variables

refer to [.env.example](.env.example)

## setup

```sh
npm install
npm run start
```

## other scripts

```sh
npm run fix        # run `standard` to check for problems and fix them if found
npm run test
npm run test:watch # keep test running and auditing for file changes
```

## api doc

### basic usage

```sh
curl 'http://localhost:3000/health'                         # health check endpoint
curl 'http://localhost:3000/city_list'                      # a list of city names mapped to their respective id
curl 'http://localhost:3000/cities?ids=3180813'             # one city dataset (businesses + weather info)
curl 'http://localhost:3000/cities?ids=3180813&ids=3174411' # an array of city datasets (max 5)
```

### available options

```sh
# filter by city names: q = STRING
curl 'http://localhost:3000/city_list?q=roma'

# pass a term to Yelp:              term    = STRING
# set limit on returned businesses: limit   = NUMBER                                        (default: 20, max: 50)
# sort returned businesses:         sort_by = best_match | rating | review_count | distance (default: best_match )
curl 'http://localhost:3000/cities?ids=3180813&ids=3174411&term=pizza&limit=3&sort_by=distance'
```

## response schemas

<details>
<summary>city dataset</summary>

```json
{
  "businesses": [
    {
      "id": "QKkVeP0eSJvpPqoKLY-d2A",
      "alias": "la-trattoria-da-gino-e-gabi-cannero-riviera",
      "name": "La Trattoria da Gino & Gabi",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/MNVTcCD5zQKBeq89Ru4FYQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/la-trattoria-da-gino-e-gabi-cannero-riviera?adjust_creative=1NqWEY6v4eRFIifCnjnNzA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=1NqWEY6v4eRFIifCnjnNzA",
      "review_count": 3,
      "categories": [
        {
          "alias": "italian",
          "title": "Italian"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 46.0222702,
        "longitude": 8.6819801
      },
      "transactions": [],
      "location": {
        "address1": "Via Dante 12",
        "address2": "",
        "address3": "",
        "city": "Cannero Riviera",
        "zip_code": "28821",
        "country": "IT",
        "state": "VB",
        "display_address": ["Via Dante 12", "28821 Cannero Riviera", "Italy"]
      },
      "phone": "+390323788160",
      "display_phone": "+39 0323 788160",
      "distance": 209.82254578223575
    },
    "..."
  ],
  "total": 11,
  "id": 3180813,
  "name": "Cannero Riviera",
  "currentWeather": {
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "main": {
      "temp": 12.61,
      "feels_like": 7.7,
      "temp_min": 10.56,
      "temp_max": 14,
      "pressure": 1029,
      "humidity": 41
    },
    "visibility": 10000,
    "wind": {
      "speed": 4.12,
      "deg": 200
    },
    "clouds": {
      "all": 0
    },
    "dt": 1614528790,
    "sys": {
      "type": 1,
      "id": 6936,
      "country": "IT",
      "sunrise": 1614492370,
      "sunset": 1614532188
    },
    "timezone": 3600
  }
}
```

</details>

<details>
<summary>city id</summary>

```json
{
  "Cannobio": 3180802
}
```

</details>

## packages docs

- [axios](https://github.com/axios/axios#example)
- [bluebird](http://bluebirdjs.com/docs/getting-started.html)
- [event-stream](https://github.com/dominictarr/event-stream)
- [express](https://expressjs.com/en/4x/api.html)
- [jest](https://jestjs.io/docs/en/getting-started.html)
- [JSONStream](https://github.com/dominictarr/JSONStream)
- [standard](https://standardjs.com/)
- [supertest](https://github.com/visionmedia/supertest)
- [yelp-fusion](https://github.com/tonybadguy/yelp-fusion#yelp-fusion)

## third party api docs

- [openweather](https://openweathermap.org/api)
- [yelp](https://www.yelp.com/developers/documentation/v3)
