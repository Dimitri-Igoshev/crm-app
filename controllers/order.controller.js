const Order = require('../models/Order')
const errorHandler = require('../utils/error-handler')

module.exports.findAll = async (req, res) => {
	const query = { user: req.user.id } //Filter

	if (req.query.start) query.date = { $gte: req.query.start }

	if (req.query.end) {
		if (!query.date) query.date = {}
		query.date['$lte'] = req.query.end
	}

	if (req.query.order) query.order = +req.query.order

	try {
		const orders = await Order
			.find(query)
			.sort({ date: -1 })
			.skip(+req.query.offset)
			.limit(+req.query.limit)

		res.status(200).json(orders)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async (req, res) => {
	try {
		const lastOrder = await Order
			.findOne({ user: req.user.id })
			.sort({ date: -1 })

		const order = await new Order({
			order: lastOrder ? lastOrder.order + 1 : 0,
			list: req.body.list,
			user: req.user.id
		}).save()
		res.status(201).json(order)
	} catch (e) {
		errorHandler(res, e)
	}
}
