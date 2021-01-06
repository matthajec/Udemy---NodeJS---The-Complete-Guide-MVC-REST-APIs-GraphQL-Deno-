const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser)

app.use((req, res, next) => {
  console.log('Wow')
  next()
})

app.use((req, res, next) => {
  console.log('#2!!!')
  next()
})

app.use('/users', (req, res) => {
  res.send('Users')
})

app.use("/", (req, res, next) => {
  res.send('<h1>Hello<h1>')
})

app.listen(3000)