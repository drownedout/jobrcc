const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const routes = require('./routes/index')

// Initialize App
const app = express()

// Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// View Engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Routes
app.use('/', routes)

app.listen(port, () => console.log(`App is listening on port ${port}`))
