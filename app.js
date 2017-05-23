'use strict'
const express = require('express');
const bodyParser = require('body-parser');
let app = express();

const index = require('./routes');
const api = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/', api);

var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost/library';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  
  db.close();
});

app.listen(3000, ()=> {
  console.log('server is listening at port 3000');
})
