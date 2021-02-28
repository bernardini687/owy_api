![](https://github.com/bernardini687/owy_api/workflows/CI/badge.svg)

# OpenWeatherYelp API

### environment variables

refer to [.env.example](.env.example)

### setup

```sh
npm install
npm run start
```

### other scripts

```sh
npm run fix        # run `standard` to check for problems and fix them if found
npm run test
npm run test:watch # keep test running and auditing for file changes
```

### api doc

```sh
curl 'http://localhost:3000/health'             # health check endpoint
curl 'http://localhost:3000/cities?ids=3180813' # one city dataset (businesses + weather, see `dataset schema`)
```

### dataset schema

```json
{

}
```

### packages docs

- [axios](https://github.com/axios/axios#example)
- [bluebird](http://bluebirdjs.com/docs/getting-started.html)
- [express](https://expressjs.com/en/4x/api.html)
- [jest](https://jestjs.io/docs/en/getting-started.html)
- [standard](https://standardjs.com/)
- [supertest](https://github.com/visionmedia/supertest)
- [yelp-fusion](https://github.com/tonybadguy/yelp-fusion#yelp-fusion)

### third party api docs

- [openweather](https://openweathermap.org/api)
- [yelp](https://www.yelp.com/developers/documentation/v3)
