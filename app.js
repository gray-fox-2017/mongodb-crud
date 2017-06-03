const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let url = 'mongodb://localhost:27017/library_2'
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to the server");

  db.close()
})

let index = require('./routes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)

app.listen(3000)

module.exports = app 
