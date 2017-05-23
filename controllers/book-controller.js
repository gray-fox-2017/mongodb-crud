'use strict'
var url = 'mongodb://localhost/library';
var MongoClient = require('mongodb').MongoClient

var insertBooks = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('books');

  collection.insertMany([
    req.body
  ], function(err, result) {
    res.send("Book inserted into the collection");
    callback(result);
  });
}

var findAll = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.find({}).toArray(function(err, docs) {
      res.send(docs)
    });
  });
}

module.exports = {
  insertBooks,
  findAll
}
