const express = require('express')
const controller = require('../controllers/position.controller')
const router = express.Router()

router.get('/:categoryId', controller.findByCategoryId)

router.post('/', controller.create)

router.patch('/', controller.update)

router.delete('/:id', controller.remove)


module.exports = router
