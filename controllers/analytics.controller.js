const Order = require('../models/Order')
const errorHandler = require('../utils/error-handler')
const moment = require('moment')

module.exports.overview = async function (req, res) {
	try {
		const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
		const ordersMap = getOrdersMap(allOrders)
		const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

		//Orders quantity
		const totalOrdersQuantity = allOrders.length
		//Yesterday orders quantity
		const yesterdayOrdersQuantity = yesterdayOrders.length
		//Quantity of days
		const daysQuantity = Object.keys(ordersMap).length
		//Orders per day
		const ordersPerDay = totalOrdersQuantity / daysQuantity
		//Orders quantity percent
		const ordersPercent = (((yesterdayOrdersQuantity / ordersPerDay) * 100) - 1).toFixed(0)
		//Total revenue
		const totalRevenue = calculatePrice(allOrders)
		//Revenue per day
		const revenuePerDay = totalRevenue / daysQuantity
		//Yesterday revenue
		const yesterdayRevenue = calculatePrice(yesterdayOrders)
		//Revenue percent
		const revenuePercent = (((yesterdayRevenue / revenuePerDay) * 100) - 1).toFixed(0)
		//Orders compare
		const compareRevenue = (yesterdayRevenue - revenuePerDay).toFixed(2)
		//Revenue compare
		const compareOrders = (yesterdayOrdersQuantity - ordersPerDay).toFixed(1)

		res.status(200).json({
			revenue: {
				percent: Math.abs(+revenuePercent),
				compare: Math.abs(+compareRevenue),
				yesterday: +yesterdayRevenue,
				isHigher: +revenuePercent > 0
			},
			orders: {
				percent: Math.abs(+ordersPercent),
				compare: Math.abs(+compareOrders),
				yesterday: +yesterdayOrdersQuantity,
				isHigher: +ordersPercent > 0
			}
		})

	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.analytics = async function (req, res) {
	try {
		const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
		const ordersMap = getOrdersMap(allOrders)

		const average =  +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

		const chart = Object.keys(ordersMap).map(label => {
			const revenue = calculatePrice(ordersMap[label])
			const order = ordersMap[label].length

			return { label, order, revenue }
		})

		res.status(200).json({ average, chart })
	} catch (e) {
		errorHandler(res, e)
	}
}

function getOrdersMap(orders = []) {
	const daysOrder = {}
	orders.forEach(order => {
		const date = moment(order.date).format('DD.MM.YYYY')

		if (date === moment().format('DD.MM.YYYY')) {
			return
		}

		if (!daysOrder[date]) {
			daysOrder[date] = []
		}

		daysOrder[date].push(order)

	})

	return daysOrder
}

function calculatePrice(orders = []) {
	return orders.reduce((acc, el) => {
		return acc += el.list.reduce((acc, el) => {
			return acc += el.cost * el.quantity
		}, 0)
	}, 0)
}
