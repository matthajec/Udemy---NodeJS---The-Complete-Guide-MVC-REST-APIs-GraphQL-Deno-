const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

const users = []

app.get('/', (req, res) => {
  res.render('index', { docTitle: 'Create New User' })
})

app.get('/users', (req, res) => {
  res.render('users', { docTitle: 'Users', usernames: users})
})

app.post('/users', (req, res) => {
  users.unshift(req.body.username)
  res.redirect('/')
})

app.listen(3000)