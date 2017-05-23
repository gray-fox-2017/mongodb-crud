var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mongodb-crud'
var ObjectId = require('mongodb').ObjectId

module.exports = {
  getAll : (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
      if(err){
        res.send(err)
      }else{
        db.collection('books').find().toArray(function (err, result) {
          if (err){
            res.send(err)
          }else{
            res.send(result)
            db.close()
          }
        })
      }
    })
  },
  getOne : (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
      if(err){
        res.send(err)
      }else{
        db.collection('books').findOne({
          _id : ObjectId(req.params.id)
        })
        .then(function (err, result) {
          if (err){
            res.send(err)
          }else{
            res.send(result)
            db.close()
          }
        })
      }
    })
  },
  insert : (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
      if(err){
        res.send(err)
      }else{
        db.collection('books').insertOne({
          isbn : req.body.isbn,
          title : req.body.title,
          author : req.body.author,
          category : req.body.category,
          stock : Number(req.body.stock)
        }, function (err, result) {
          if (err){
            res.send(err)
          }else{
            res.send(result)
            db.close()
          }
        })
      }
    })
  },
  delete : (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
      if(err){
        res.send(err)
      }else{
        db.collection('books').deleteOne({
          _id : ObjectId(req.params.id)
        },function (err, result) {
          if (err){
            res.send(err)
          }else{
            res.send(result)
            db.close()
          }
        })
      }
    })
  },
  updateOne : (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
      if(err){
        res.send(err)
      }else{
        db.collection('books').updateOne({
          _id : ObjectId(req.params.id)
        }, {$set : req.body}, {new: true}, function (err, result) {
          if (err){
            res.send(err)
          }else{
            res.send(result)
            db.close()
          }
        })
      }
    })
  }
}
