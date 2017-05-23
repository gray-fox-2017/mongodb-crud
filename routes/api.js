var express = require('express');
var router = express.Router();
var bookController = require('../controllers/book-controller')

/* GET users listing. */
router.get('/books', bookController.findAll);

module.exports = router;
