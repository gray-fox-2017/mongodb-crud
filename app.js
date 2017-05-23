const express = require('express');
const app = express();

var books = require('./routes/books')

var MongoClient = require('mongodb').MongoClient


// Connection URL
var url = 'mongodb://localhost/mongodb-crud';

// Use connect method to connect to the server




app.use('/', books);

app.listen(3000, ()=>{
  // console.log("aa");
})

// module.exports = app;
