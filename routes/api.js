var express = require('express');
var router = express.Router();
var bookController = require('../controllers/book-controller')

router.get('/books', bookController.findAll);

// create new book
router.post('/books', bookController.newBook)

// delete book
router.delete('/books/:id', bookController.deleteBook)

// update book
router.put('/books/:id', bookController.updateBook)

// get book by id
router.get('/books/:id', bookController.getOneBook)

module.exports = router;
