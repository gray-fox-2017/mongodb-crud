var express = require('express');
var router = express.Router();
let book_controller = require('../controllers/book_controller.js');




router.get('/seed', book_controller.seed);
router.get('/', book_controller.listBook);
router.get('/:id', book_controller.findBook);
router.put('/:id', book_controller.updateBook);
router.delete('/:id', book_controller.destroyBook);
router.post('/', book_controller.insertBook);



module.exports = router;
