const app = require('./app')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.listen(process.env.PORT || 3000)
