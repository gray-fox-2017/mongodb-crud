var express = require('express');
var bodyParser = require('body-parser');

var books = require('./routes/books')
var app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api/books', books)

app.listen(3000,()=>{
  console.log('Your connected in port 3000')
})
