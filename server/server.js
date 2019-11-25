require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET
}))

// Auth Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.loggedIn)

// 

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})