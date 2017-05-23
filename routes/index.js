var express = require('express');
var router = express.Router();
var books_controller = require('../controllers/books_controller.js')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/crud_mongodb";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/api/books', books_controller.findBooks)
router.delete('/api/books/:_id', books_controller.deleteBooks)
router.post('/api/books/', books_controller.addBooks)
router.put('/api/books/:_id', books_controller.editBooks)



module.exports = router;
