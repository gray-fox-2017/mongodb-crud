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
        let collection = db.collection('customers')
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
          let collection = db.collection('customers')
          collection.find({}).toArray((err, docs) => {
            err ? res.send(err) : res.json(docs)
            db.close()
          })
      }
    });
  },
  insert: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('customers')
          collection.find({'memberid': req.body.memberid}).toArray((err, docs) => {
            if(err)
              res.send(err)
            else{
              if(docs.length>0){
                res.send("data sudah ada !")
              } else {
                collection.insertOne(
                  {
                    "_id": ObjectId(req.body._id),//"5715b4f38c41ba33b7fa36e3"
                    "name": req.body.name,
                    "memberid": req.body.memberid,
                    "address": req.body.address,
                    "zipcode": req.body.zipcode,
                    "phone": req.body.phone
                  }, function(err, result){
                    err ? res.send(err) : res.send("berhasil ditambahkan !")
                    db.close()
                  }
                )
              }
            }
          })
      }
    });
  },
  update: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('customers')
          collection.updateOne({"_id": ObjectId(req.params.id)},{
            $set: {
              "_id": ObjectId(req.params.id),//"5715b4f38c41ba33b7fa36e3"
              "name": req.body.name,
              "memberid": req.body.memberid,
              "address": req.body.address,
              "zipcode": req.body.zipcode,
              "phone": req.body.phone
            }
          }, function(err, result){
              err ? res.send(err) : res.send("berhasil diupdate !")
              db.close()
            }
          )
      }
    });
  },
  delete: function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        res.send(err)
      }
      else{
          let collection = db.collection('customers')
          collection.deleteOne({"_id": ObjectId(req.params.id)}, function(err, result){
              err ? res.send(err) : res.send("berhasil dihapus !")
              db.close()
            }
          )
      }
    });
  }

}
