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
	connection.query('SELECT * FROM teams', function (err, rows, fields) {
		if (err) {
			throw err
		}
		res.render('index.ejs', {
			teams: rows
		})
	})
})

module.exports = router
