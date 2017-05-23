const express = require('express')
const router = express.Router()
let bookController = require('../controllers/bookController')

// router.get('/', (req, res) => {
//   ress.send('Hallo')
// })

router.post('/api/books', bookController.insertOne)

module.exports = router