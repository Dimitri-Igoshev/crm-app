const express = require('express')
const app = express()

const PORT = 5000

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Hello, route works!'
	})
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
