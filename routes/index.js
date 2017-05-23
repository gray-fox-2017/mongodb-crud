const express = require('express');
const router = express.Router();
const crud = require('../controllers/crud');

router.post('/', crud.insertBook);
router.get('/', crud.findBooks);
router.get('/:isbn', crud.findBook);
router.put('/:isbn',crud.updateBook);
router.delete('/:isbn',crud.deleteBook);

module.exports = router;
