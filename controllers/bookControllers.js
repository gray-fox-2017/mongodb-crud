var models = require('../models/book')
var ObjectId = require('mongodb').ObjectId

const getAll = function(req,res) {
  models.MongoClient.connect(models.url, function(err,db) {
    db.collection('books')
    .find()
    .toArray(function(err,result) {
      if (result) {
        res.send(result)
        db.close()
      } else {
        res.send(err)
        bd.close()
      }
    })
  })
}

const createOne = function(req,res) {
  models.MongoClient.connect(models.url, function(err,db) {
    db.collection('books')
    .insertOne({
      isbn : req.body.isbn,
      title : req.body.title,
      author : req.body.author,
      stock : req.body.stock
    },function(err,result) {
      if (err) {
        res.send(err)
        db.close()
      } else {
        res.send(result)
        db.close()
      }
    })
  })
}

const deleteDoc = function(req,res) {
  models.MongoClient.connect(models.url, function(err,db) {
    db.collection('books')
    .remove({
      _id : ObjectId(req.params.id)
    },function(err,result) {
      if (err) {
        res.send(err)
        db.close()
      } else {
        res.send(result)
        db.close()
      }
    })
  })
}

const updateDoc = function(req,res) {
  models.MongoClient.connect(models.url, function(err,db) {
    db.collection('books')
    .update({
      _id : ObjectId(req.params.id)
    },{
      title : req.body.title,
      author : req.body.author,
      isbn : req.body.isbn,
      stock : req.body.stock
    },function(err,result) {
      if (err) {
        res.send(err)
        db.close()
      } else {
        res.send(result)
        db.close()
      }
    })
  })
}

module.exports = {
  getAll,
  createOne,
  deleteDoc,
  updateDoc
};
