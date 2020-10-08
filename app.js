const express = require('express')
const bodyParser = require('body-parser')
const authLogin = require('./routes/routers')
const app = express()
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(require('cors')())

app.use('/api', authLogin)

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


module.exports = app