var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:3000/bookscollection';


function create (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('Books').insertOne({
      "isbn": req.body.isbn,
      "title": req.body.title,
      "author": req.body.author,
      "category": req.body.category,
      "stock": req.body.stock
    },function(err,result){
      res.send(`Success Create: ` + result)
      db.close()
    })
  })
}

function update (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('Books'),updateOne({
      "title": req.params.title
    },{
      $set:{  
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      }
    },function(err,result){
      res.send(`${req.params.title} Updated!`)
      db.close()
    })
  })
}

function deleteBook (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('Books'),deleteOne({
      "title": req.params.title
    },function (err,result){
      res.send(`${req.params.title} Deleted!`)
      db.close()
    })
  })
}

function findAllBooks (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('Books'),find( );
    cursor.each(function (err,result){
      res.send(result)
      db.close()
    })
  })  
}

function findBook (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('Books'),find({
      "title": req.params.title
    },function(err,result){
      res.send(result)
      db.close()
    })
  })
}


module.exports = {
  create,update,deleteBook,findAllBooks,findBook
}

