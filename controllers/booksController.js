var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/library';

var insertBook = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.insertOne(
      { isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      }, function(err, result) {
      res.send(result.ops)
    });
  });
}

var findBooks = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.find({}).toArray(function(err, books) {
      res.send(books)
    })
  });
}

var findOne = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.find({_id: ObjectID(req.params.id)}).toArray(function(err, books) {
      res.send(books)
    })
  });
}

var updateBook = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.updateOne({_id: ObjectID(req.params.id)}, {$set: req.body}, function(err, r) {
      res.send("Book has been updated")
    })
  });
}

var deleteBook = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.deleteOne({_id: ObjectID(req.params.id)}, function(err, r) {
      res.send("Book has been deleted")
    })
  });
}


module.exports = {
  insertBook, findBooks, findOne, updateBook, deleteBook
};