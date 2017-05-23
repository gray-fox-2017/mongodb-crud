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

module.exports = methods