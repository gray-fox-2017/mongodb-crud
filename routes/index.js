var express = require('express');
var router = express.Router();
const controller = require('../Controllers/mongodb.js')
/* GET home page. */
router.post('/add', controller.create)

router.put('/edit', controller.update)

router.delete('/delete/:title', controller.deleteBook)

router.get('/', controller.findAllBooks)

router.get('/:title', controller.findBook)


module.exports = router;
