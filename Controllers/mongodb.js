var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://book:booking@ds161295.mlab.com:61295/bookscollection'


function create (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('books').insertOne({
      "isbn": req.body.isbn,
      "title": req.body.title,
      "author": req.body.author,
      "category": req.body.category,
      "stock": req.body.stock
    },function(err,result){
      if(!err){
        res.send(`Success Create: ${req.body.title}`)
        
      }
      else{
        console.log(err);
      }
      db.close()
    })
  })
}

function update (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('books').updateOne({
      "_id": ObjectId(req.params.id)
    },{
      $set:{  
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      }
    },function(err,result){
      res.send(`${req.params.id} Updated!`)
      db.close()
    })
  })
}

function deleteBook (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('books').deleteOne({
      "_id":ObjectId(req.params.id)
    },function (err,result){
      res.send(`${req.params.title} Deleted!`)
      db.close()
    })
  })
}

function findAllBooks (req,res,next){
  MongoClient.connect(url,function(err,db){
    let cursor = db.collection('books').find({}).toArray(function (err,result){
        res.send(result)
        db.close()
      })  
  })  
}

function findBook (req,res,next){
  MongoClient.connect(url,function(err,db){
    db.collection('books').find({
      "_id":ObjectId(req.params.id)
    },function(err,result){
      res.send(result)
      db.close()
    })
  })
}


module.exports = {
   create,update,deleteBook,findAllBooks,findBook
}

