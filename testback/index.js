const express = require('express')
const app = express()
const port = 3000

const admin = (req, res) => {
  res.send( 'Admin dashboard' )
}

const isLoggedIn = (req, res, next) => {
  console.log('Logged in successfully')
  next();
}

const isAdmin = (req, res, next) => {
  console.log('Admin check done')
  next()
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.send( 'Logged in successfully' )
})

app.get('/admin', isLoggedIn, isAdmin , admin)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})