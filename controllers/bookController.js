const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let url = 'mongodb://localhost/selasamongoosecrud';
let methods = {}

methods.insertOne = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    let collection = db.collection('books')
    collection.insertOne(req.body, (err, record) => {
      if (err) res.send(err)
      console.log('Insert data book success');
      res.send(record)
      db.close()
    })
  });
}

methods.getAll = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books')
    collection.find({}).toArray(function(err, records) {
        if (err) res.json({err})
        console.log("Get all data books success");
        res.json(records)
        db.close()
    });
  });
}

methods.getById = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books')
    collection.find({
      "_id": new ObjectId(req.params.id)
    }).toArray(function(err, record) {
        if (err) res.json({err})
        console.log("GetById data book success");
        res.json(record)
        db.close()
    });
  })
}

methods.updateById = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books')
    collection.find({
      "_id": new ObjectId(req.params.id)
    }).toArray(function(err, record) {
      console.log(record[0]);
      collection.updateOne({
          "_id": record[0]._id
      }, {
        $set: {
          "isbn": req.body.isbn || record[0].isbn,
          "title": req.body.title || record[0].title,
          "author": req.body.author || record[0].author,
          "category": req.body.category || record[0].category,
          "stock": req.body.stock || record[0].stock
        }
      }, function(err, record) {
          if (err) res.json({err})
          console.log('UpdateById success');
          res.json(record)
          db.close()
      });
    });
  })
}

methods.deleteById = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books')
    collection.find({
      "_id": new ObjectId(req.params.id)
    }).toArray(function(err, record) {
      console.log(record[0]);
      collection.deleteOne({
          "_id": record[0]._id
      }, function(err, record) {
          if (err) res.json({err})
          console.log('DeleteById success');
          res.json(record)
          db.close()
      });
    });
  })
}

module.exports = methods