const express = require('express');
const router = express.Router();
const book = require('../controller/book')

router.post('/books', book.createData);

router.get('/books', book.findAll);

router.get('/books/:id', book.findOne);

router.delete('/books/:id', book.deleteData);

router.put('/books/:id', book.updateData);

module.exports = router;
