module.exports = {
  status: 200,
  statusText: 'OK',
  data: {
    coord: { lon: 42.5093, lat: 44.4564 },
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03n'
      }
    ],
    base: 'stations',
    main: {
      temp: 13,
      feels_like: 5.17,
      temp_min: 13,
      temp_max: 13,
      pressure: 1017,
      humidity: 50
    },
    visibility: 10000,
    wind: { speed: 9, deg: 280 },
    clouds: { all: 40 },
    dt: 1614413079,
    sys: {
      type: 1,
      id: 8966,
      country: 'RU',
      sunrise: 1614397864,
      sunset: 1614437679
    },
    timezone: 10800,
    id: 538582,
    name: 'Kursavka',
    cod: 200
  }
}
