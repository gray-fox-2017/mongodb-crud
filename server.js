const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const index = require('./routes/index')
const logger = require('morgan')

// NOTE: set
app.set('port', process.env.PORT || 3000)

// NOTE: use
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', index)

app.listen(app.get('port'), () => {
  console.log('Listen on port '+app.get('port'));
})