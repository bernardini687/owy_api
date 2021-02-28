if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./app')

app.listen(process.env.PORT || 3000)
