const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const books = require('./routes/books');

app.set('port',process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/books',books)


app.listen(app.get('port'),()=>{
  console.log('server udah jalan cuy!');
})