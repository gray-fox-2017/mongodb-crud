const express = require('express')
const router = express.Router()
let bookController = require('../controllers/bookController')

// router.get('/', (req, res) => {
//   ress.send('Hallo')
// })

router.post('/api/books', bookController.insertOne)
router.get('/api/books', bookController.getAll)
router.get('/api/book/:id', bookController.getById)
router.put('/api/book/:id', bookController.updateById)
router.delete('/api/book/:id', bookController.deleteById)

module.exports = router