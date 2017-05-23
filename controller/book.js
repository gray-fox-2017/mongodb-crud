const express = require('express')
const router = express.Router()
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017/library';

module.exports = {
  createData : function(req, res, next){
    MongoClient.connect(url, function(err, db){
      if (err){
        res.send(err)
      } else {
        let body = req.body
        db.collection('books').insertOne({
            isbn: body.isbn,
            title: body.title,
            author: body.author,
            category: body.category,
            stock: Number(body.stock)
        }, function(err, result){
          if(err){
            res.send(err)
          } else {
            res.send(result)
            db.close()
          }
        })
      }
    })
  },
  findAll: function(req, res, next){
    MongoClient.connect(url, function(err, db){
      if(err){
        res.send(err)
      } else {
        db.collection('books').find({}).toArray(function(err, docs){
          if(!err){
            res.send(docs)
            db.close()
          } else {
            res.send(err)
          }
        })
      }
    })
  },
  findOne: function(req, res, next){
    MongoClient.connect(url, function(err, db){
      if(err){
        res.send(err)
      } else {
        db.collection('books').find({
          _id: ObjectID(req.params.id)
        })
        .toArray(function(err, docs){
          if(!err){
            res.send(docs)
            db.close()
          } else {
            res.send(err)
          }
        })
      }
    })
  },
  updateData : function(req, res, next){
    MongoClient.connect(url, function(err, db){
      if(err){
        res.send(err)
      } else {
        db.collection('books').updateOne({
          _id: ObjectID(req.params.id)
        }, {
          $set : {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: Number(req.body.stock)
          }
        }, { new: true }, function(err, result){
          if(!err){
            res.send(result)
            db.close()
          } else {
            res.send(err)
          }
        })
      }
    })
  },
  deleteData : function(req, res, next){
    MongoClient.connect(url, function(err, db){
      if (err) {
        res.send(err)
      } else {
        db.collection('books').deleteOne({
          _id: ObjectID(req.params.id)
        }, function(err, result){
          if(!err){
            res.send('deleted')
            db.close()
          } else {
            res.send(err)
          }
        })
      }
    })
  }
}
