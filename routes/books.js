var express = require('express');
var router = express.Router();

var booksController = require('../controllers/booksController')

router.get('/', booksController.findBooks)

router.post('/', booksController.insertBook)

router.get('/:id', booksController.findOne)

router.put('/:id', booksController.updateBook)

router.delete('/:id', booksController.deleteBook)

module.exports = router;