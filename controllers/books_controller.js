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


// function updateBook(req, res) {
//   MongoClient.connect(url, function(err, db) {
//     if (err) {
//       res.send(err.message);
//     }
//
//     db.collection('books').deleteOne({
//       _id: ObjectId(req.params.id)
//     }, function(err, result) {
//       if (err) {
//         res.send(err.message);
//       }
//       console.log("Delete user success!!");
//       res.send("Delete user success!!\n" + result);
//       db.close();
//     });
//   });
//
//   db.Students.findById(req.params.id)
//   .then(student => {
//     db.Students.update({
//       name : req.body.name || student.name,
//       gender : req.body.gender || student.gender,
//       age : req.body.age || student.age,
//       address : req.body.address || student.address,
//       email : req.body.email || student.email,
//       username : req.body.username || student.username,
//       password : hash || student.password,
//       role : req.body.role || student.role
//     }, {
//       where: {
//         id: req.params.id
//       }
//     })
//     res.send(`Update user success!!`);
//   })
//   .catch(err => res.send(err.message));
// }

module.exports = {
  getAll, getSingle, createBook, deleteBook
};
