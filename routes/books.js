const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/books')

router.get('/',bookControllers.getAll)
router.get('/:id',bookControllers.getOne)
router.post('/',bookControllers.insert)
router.delete('/:id',bookControllers.delete)
router.patch('/:id',bookControllers.updateOne)

module.exports = router
