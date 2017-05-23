const express = require('express');
const router = express.Router()
const booksController = require('../controllers/booksController');

router.get('/',booksController.findAll)

router.post('/',booksController.create)

router.put('/:id',booksController.update)

router.delete('/:id',booksController.delete)

module.exports = router;