const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email })

	if (candidate) {
		const isMatch = bcrypt.compareSync(req.body.password, candidate.password)
		if (isMatch) {
			const token = jwt.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt, { expiresIn: 60 * 60 * 24 })

			res.status(200).json({
				token: `Bearer ${token}`
			})
		} else {
			res.status(401).json({
				message: 'Passwords don\'t match, try again.'
			})
		}
	} else {
		res.status(404).json({
			message: 'User with this email address was not found.'
		})
	}
}

module.exports.registration = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email })

	if (candidate) {
		res.status(409).json({
			message: 'User with this email already exists. Try another one.'
		})
	} else {
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt)
		})

		try {
			await user.save()
			res.status(201).json(user)
		} catch (e) {
			console.error(e)
		}
	}
}
