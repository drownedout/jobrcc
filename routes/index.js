var express = require('express')
var router = express.Router()
var mysql = require('mysql')
const keys = require('../config/keys')

var connection = mysql.createConnection({
	host: keys.host,
	user: keys.user,
	database: keys.database
})

connection.connect()

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
