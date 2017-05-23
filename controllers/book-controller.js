'use strict'
var url = 'mongodb://localhost/library';
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

var findAll = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.find({}).toArray(function(err, docs) {
      res.send(docs)
    });
  });
}

var newBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.insertMany(
      req.body,
      function(err, result){
        res.send(result)
      }
    )
  });
}

var getOneBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    var id = req.params.id
    var o_id = new ObjectId(id)
    collection.find({"_id":o_id}).toArray(function(err, docs) {
      res.send(docs)
    });
  });
}

var deleteBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    var id = req.params.id
    var o_id = new ObjectId(id)
    collection.deleteOne(
      {"_id":o_id},
      function(err, result){
        res.send("book deleted")
      }
    )
  });
}

var updateBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    var id = req.params.id
    var o_id = new ObjectId(id)
    collection.updateOne(
      {"_id":o_id},
      { $set: req.body },
      function(err, result){
        res.send("book updated")
      }
    )
  });
}

module.exports = {
  findAll,
  newBook,
  getOneBook,
  deleteBook,
  updateBook
}
