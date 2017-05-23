var express = require('express');
var router = express.Router();
var bookControllers = require('../controllers/bookControllers')

//List all books
router.get('/', bookControllers.getAll);

//Create one input
router.post('/',bookControllers.createOne)

//Delete by id
router.delete('/:id',bookControllers.deleteDoc)

//Update all by id
router.patch('/:id',bookControllers.updateDoc)

module.exports = router;
