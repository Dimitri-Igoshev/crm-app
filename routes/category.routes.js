const express = require('express')
const controller = require('../controllers/category.controller')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.findAll)

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.findById)

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router
