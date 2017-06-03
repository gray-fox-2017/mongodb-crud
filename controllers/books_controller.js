var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/library_2';
var ObjectId = require('mongodb').ObjectId


module.exports = {
  findById: function(req, res){
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
        let collection = db.collection('books')
        collection.find({'_id': ObjectId(req.params.id)}).toArray((err, docs) => {
          err ? res.send(err) : res.json(docs)
        })
      }
    })
  },
  findAll: function(req, res){
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('books')
          collection.find({}).toArray((err, docs) => {
            err ? res.send(err) : res.json(docs)
          })
      }
      db.close()
    });
  },
  insert: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('books')
          collection.find({'isbn': req.body.isbn}).toArray((err, docs) => {
            if(err)
              res.send(err)
            else{
              if(docs){
                res.send("buku sudah ada !")
              } else {
                collection.insertOne(
                  {
                    "_id": ObjectId(req.body._id),//"5715b4f38c41ba33b7fa36e3"
                    "isbn": req.body.isbn,
                    "title": req.body.title,
                    "author": req.body.author,
                    "category": req.body.category,
                    "stock": Number(req.body.stock)
                  }, function(err, result){
                    err ? res.send(err) : res.send("berhasil ditambahkan !")
                  }
                )
              }
            }
          })
      }
      db.close()
    });
  },
  update: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('books')
          collection.updateOne({"_id": ObjectId(req.params.id)},{
            $set: {
              "_id": ObjectId(req.params.id),//"5715b4f38c41ba33b7fa36e3"
              "isbn": req.body.isbn,
              "title": req.body.title,
              "author": req.body.author,
              "category": req.body.category,
              "stock": Number(req.body.stock)
            }
          }, function(err, result){
              err ? res.send(err) : res.send("berhasil diupdate !")
            }
          )
      }
      db.close()
    });
  },
  delete: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('books')
          collection.deleteOne({"_id": ObjectId(req.params.id)}, function(err, result){
              err ? res.send(err) : res.send("berhasil dihapus !")
            }
          )
      }
      db.close()
    });
  }

}
