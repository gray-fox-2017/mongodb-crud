let mongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let url = "mongodb://localhost/library";

const seed = () => {
  mongoClient.connect(url, (err,db) => {
    let books = db.collection("books");
    books.insert([
      {isbn:"978-1-60309-057-5",title:"One Piece",author:"Eiichiro Oda",category:"Manga",stock:3},
      {isbn:"978-2-13281-072-5",title:"Drawing with the left side of the brain",author:"Barbara",category:"Design",stock:2},
      {isbn:"978-1-11232-222-2",title:"Arabian Nights",author:"various author",category:"Fantasy",stock:6}
    ], (err,res)=> {
      console.log(err? err: `Seed 3 book into book list`) ;
    })
    db.close();
  });
}

const insertBook = (req,res) => {

  let book = {};
  book.isbn = req.body.isbn;
  book.title = req.body.title;
  book.author = req.body.author;
  book.category  = req.body.category;
  book.stock = req.body.stock;

  mongoClient.connect(url, (err,db) => {
    let books = db.collection('books');
    books.insertOne(
      book,
      (err, result) => {
        db.close();
        res.send(err? err: `${book.title} inserted into Book list!`) ;
      }
    );

  });
}
const destroyBook = (req,res) => {
  let id = (req.params.id);
  mongoClient.connect(url, (err,db) => {
    let books = db.collection('books');``
    books.remove({_id:ObjectID(id)}, (err,res) => {
      db.close();
      res.send(err? err: `${isbn} deleted!`);
    })

  });
}

const updateBook = (req,res) => {
  let book = {}
  if (typeof req.body.title !== 'undefined' && req.body.title !=='') book.title = req.body.title;
  if (typeof req.body.author !== 'undefined' && req.body.author !=='') book.author = req.body.author;
  if (typeof req.body.category !== 'undefined' && req.body.category !=='') book.category  = req.body.category;
  if (typeof req.body.stock !== 'undefined' && req.body.stock !=='') book.stock = req.body.stock;
  if (typeof req.body.isbn !== 'undefined' && req.body.isbn !=='') book.isbn = req.body.isbn;
  let id = (req.params.id);
  mongoClient.connect(url, (err,db) => {
    let books = db.collection('books');
      books.updateOne(
        {_id: ObjectID(id)},
        {$set:book},
        (err,result) =>  {   db.close(); res.send(err? err: `${id} updated!`) ;  }
      );
  });
}
const findBook = (req,res) => {
  let id = (req.params.id);
  mongoClient.connect(url, (err,db) => {
    let books = db.collection('books');
    books.findOne ({_id: ObjectID(id)}).then((err,result) =>  {   db.close(); res.send(err? err: `${id} updated!`) ;  })
  });
}
const listBook = (req,res) => {
  mongoClient.connect(url, (err,db) => {
    let books = db.collection('books');
    books.find({}).toArray((err,lbooks)=> {
      console.log(err? err: lbooks) ;
      db.close();
      res.send(lbooks);
    });
  });
}

module.exports = {
  seed,
  listBook,
  findBook,
  updateBook,
  destroyBook,
  insertBook
}