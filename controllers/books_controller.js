var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/crud_mongodb";

//test connection
MongoClient.connect(url, function(err, db) {
  console.log("connection success");
  // if (err) throw err;
  //create database and table
  // console.log("Database created!");
  // db.createCollection("books", function(err, res) {
  //   if (err) throw err;
  //   console.log("Table created!");
  //   db.close();
  // });

  //insert data
  // var objData = { isbn : "978-1-60309-057-5", title: "Dragon Puncher", author: "Erwin", category : "All Ages", stock : 3 };
  // db.collection("books").insertOne(objData, function(err, res) {
  //  if (err) throw err;
  //  console.log("1 record inserted");
  //  db.close();
  // });
});

var findBooks = function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection("books").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
}

var addBooks = function(req, res) {
  let isbn = req.body.isbn
  let title = req.body.title
  let author = req.body.author
  let category = req.body.category
  let stock = req.body.stock
  MongoClient.connect(url, function(err, db) {
  var objData = { isbn : isbn, title: title, author: author, category : category, stock : stock };
  if (err) throw err;
    // db.collection("books").insertOne(req.body) {
    db.collection("books").insertOne(objData, function(err, result) {
     if (err) throw err;
     res.send(result.result.n + " record inserted")
     db.close();
    });
  })
}

var deleteBooks = function(req, res) {
    MongoClient.connect(url, function(err, db) {
    let id = ObjectID(req.params._id) //tipe data pada _id menggunakan ObbjectID
    console.log("============="+id);
    if (err) throw err;

    var myquery = { _id : id };
    console.log("============" +JSON.stringify(myquery));
    db.collection("books").deleteOne( myquery, function(err, obj) {
      if (err) throw err;
      // console.log(obj.result.n + " document(s) deleted");
      console.log(obj.result);
      res.send(obj.result.n+" document(s) deleted")
      db.close();
    });
  });
}

var editBooks = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let id = ObjectID(req.params._id)
    var myquery = { _id : id };
    db.collection("books").findOne(myquery, function(err, obj) {
      if (err) throw err;
      var myquery = { isbn : obj.isbn,
                      title: obj.title,
                      author: obj.author,
                      category : obj.category,
                      stock : obj.stock };
      var newvalues = { isbn : req.body.isbn || obj.isbn,
                        title: req.body.title || obj.title,
                        author: req.body.author || obj.author,
                        category : req.body.category || obj.category,
                        stock : req.body.stock || obj.stock};
      db.collection("books").update(myquery, newvalues, function(err, obj2) {
        if (err) throw err;
        res.send(obj2.result.nModified + " record updated")
        db.close();
      });
      db.close();
    });

  });
}

module.exports = {
  findBooks,
  addBooks,
  editBooks,
  deleteBooks
}