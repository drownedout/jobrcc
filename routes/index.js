const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const keys = require('../config/keys')
const env = process.env.NODE_ENV || 'development'

let connection

if (env === 'development') {
	connection = mysql.createConnection({
		host: keys.host,
		user: keys.user,
		database: keys.database
	})
} else {
	connection = mysql.createConnection({
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: process.env.RDS_PORT,
		database: process.env.RDS_DB_NAME
	})
}

connection.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack)
		return
	}

	console.log('Connected to database.')
})

router.get('/', function (req, res, next) {
	connection.query(`SELECT a.name, b.team_id, SUM(c.points) AS total_points
						FROM teams a 
						JOIN users b ON a.id = b.team_id 
						JOIN points c ON b.id = c.user_id 
						GROUP BY a.name, b.team_id 
						ORDER BY total_points DESC`,
	function (err, rows, fields) {
		if (err) {
			throw err
		}
		res.render('index.ejs', {
			teams: rows,
			colors: [
				'#FF1300',
				'#FF8C00',
				'#FFBB00',
				'#00FF7D',
				'#00A0FF'
			]
		})
	})
})

module.exports = router
