const express = require('express')
const controller = require('../controllers/category.controller')
const router = express.Router()

router.get('/', controller.findAll)

router.get('/:id', controller.findById)

router.post('/', controller.create)

router.patch('/:id', controller.update)

router.delete('/:id', controller.remove)

module.exports = router
