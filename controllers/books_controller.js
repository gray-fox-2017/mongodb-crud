var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/library';
const ObjectId = require('mongodb').ObjectId;

function getAll(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('books').find({}).toArray(function(err, result) {
      if (err) {
        res.send(err.message);
      }
      console.log("Found the following records:");
      console.log(result);
      res.send(result);
      db.close();
    });
  });
}

function getSingle(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('books').find({
      _id: ObjectId(req.params.id)
    }).toArray(function(err, result) {
      if (err) {
        res.send(err.message);
      }
      console.log("Found the following record:");
      console.log(result);
      res.send(result);
      db.close();
    });
  });
}

function createBook(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('books').insert({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }, function(err, result) {
      if (err) {
        res.send(err.message);
      }
      console.log("Insert the following record:");
      console.log(result);
      res.send(result);
      db.close();
    });
  });
}

function deleteBook(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('books').deleteOne({
      _id: ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        res.send(err.message);
      }
      console.log("Delete user success!!");
      res.send("Delete user success!!\n" + result);
      db.close();
    });
  });
}

function updateBook(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('books').find({
      _id: ObjectId(req.params.id)
    }).toArray(function(err, result) {
      db.collection('books').update({
        _id: result[0]._id
      }, {
        $set: {
          isbn: req.body.isbn || result[0].isbn,
          title: req.body.title || result[0].title,
          author: req.body.author || result[0].author,
          category: req.body.category || result[0].category,
          stock: req.body.stock || result[0].stock
        }
      }, (err, result) => {
        if (err) return res.send(err)
          res.send(result);
          db.close();
      });
    });
  });
}

module.exports = {
  getAll, getSingle, createBook, deleteBook, updateBook
};
