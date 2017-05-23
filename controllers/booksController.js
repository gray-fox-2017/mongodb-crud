var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/library';
let ObjectID = require('mongodb').ObjectID

module.exports = {
  findAll:(req,res)=>{
    MongoClient.connect(url,(err, db)=>{
      console.log("Connected successfully to server -- FIND ALL");
      var Book = db.collection('books');
      Book.find({}).toArray((err,data)=>{
        console.log('Found these books');
        res.send(data)
        // res.json(data)
      });
      db.close();
    });
  },
  create:(req,res)=>{
    MongoClient.connect(url,(err, db)=>{
      console.log("Connected successfully to server -- CREATE");
      var Book = db.collection('books');
      Book.insertOne({
        isbn : req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      },(err, result)=>{
        console.log(`Successfully inserted into the collection: ${result}`);
        res.send(`Successfully updated into the collection : ${result}`)
      });
      db.close();
    });
  },
  update:(req,res)=>{
    MongoClient.connect(url,(err, db)=>{
      console.log("Connected successfully to server -- UPDATE");
      var Book = db.collection('books');
      Book.findOne({_id : ObjectID(req.params.id)})
      .then(book=>{
        console.log(book);
        Book.updateOne(
          {_id : ObjectID(req.params.id)},
          {$set:
            {
              isbn : req.body.isbn||book.isbn,
              title: req.body.title||book.title,
              author: req.body.author||book.author,
              category: req.body.category||book.category,
              stock: req.body.stock||book.stock
            }
          },(err, result)=>{
          console.log(`Successfully updated into the collection : ${result}`);
          res.send(`Successfully updated into the collection : ${result}`)
          db.close();
        });
      })
    });
  },
  delete:(req,res)=>{
    MongoClient.connect(url,(err, db)=>{
      console.log("Connected successfully to server -- UPDATE");
      var Book = db.collection('books');
      Book.deleteOne(
        {_id : ObjectID(req.params.id)},
        (err, result)=>{
        console.log(`Successfully deleted from the collection : ${result}`);
        res.send(`Successfully deleted from the collection : ${result}`)
      });
      db.close();
    });
  }
};