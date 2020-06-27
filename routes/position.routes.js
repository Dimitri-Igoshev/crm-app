const express = require('express')
const controller = require('../controllers/position.controller')
const passport = require('passport')
const router = express.Router()

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.findByCategoryId)

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

router.patch('/', passport.authenticate('jwt', { session: false }), controller.update)

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router
