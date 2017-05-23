const express = require('express');
const router = express.Router();
const crud = require('../controllers/crud');

router.post('/', crud.insertBook);
router.get('/', crud.findBooks);
router.get('/:id', crud.findBook);
router.put('/:id',crud.updateBook);
router.delete('/:id',crud.deleteBook);

module.exports = router;
