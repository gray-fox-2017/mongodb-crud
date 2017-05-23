var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/library';

var seedBooks = (() => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    collection.insertMany([
      {
        isbn: '978-1-60309-057-5',
        title: 'Dragon Puncher',
        author: 'James Kochalka',
        category: 'All Ages',
        stock: 3
      }, {
        isbn: '978-1-891830-77-8',
        title: 'Every Girl is the End of the World for Me',
        author: 'Jeffrey Brown',
        category: 'Mature (16+ )',
        stock: 5
      }
    ], (err,result) => {
      res.send('Inserted 2 documents into the collection');
    });
    db.close();
  });
});

var insertBook = ((req,res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    collection.insertOne({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }, (err,result) => {
      res.send('The book is successfully inserted into the collection');
    });
    db.close();
  });
});

var findBooks = ((req,res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    collection.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
    db.close();
  });
});

var findBook = ((req,res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    let isbn = req.params.isbn;
    collection.findOne({isbn:isbn})
      .then (book => {
        book ? res.send(book) : res.send('Book is not found.');
      });
    db.close();
  });
});

var updateBook = ((req,res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    let isbn = req.params.isbn;
    collection.findOne({isbn:isbn})
      .then (book => {
        collection.updateOne({isbn: book.isbn}, {$set: {
          title: req.body.title || book.title,
          author: req.body.author || book.author,
          category: req.body.category || book.category,
          stock: req.body.stock || book.stock
        }}, function (err, result) {
          res.send('Book is updated');
        });
      })
      .catch (err => {
        res.send(err);
      });
    //    collection.findOneAndReplace(
    //      {isbn: isbn},
    //      {"isbn": isbn,"title": req.body.title,"author": req.body.author,"category": req.body.category, "stock": req.body.stock})
    //      .then (() => {
    //        res.send('Book is updated');
    //      });
    db.close();
  });
});

var deleteBook = ((req,res) => {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('books');
    let isbn = req.params.isbn;
    collection.deleteOne({isbn:isbn}, function(err,deleted) {
      deleted.n > 0 ? res.send ('Book is deleted') : res.send('ISBN is not found');
    });
    db.close();
  });
});

module.exports = {
  insertBook,
  findBooks,
  findBook,
  updateBook,
  deleteBook
};
