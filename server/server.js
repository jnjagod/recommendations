require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

// Controllers
const authCtrl = require('./controllers/authController')
const gameCtrl = require('./controllers/gameController')
const favCtrl = require('./controllers/favController')
const postCtrl = require('./controllers/postController')
const suggestCtrl = require('./controllers/suggestController')
const twilioCtrl = require('./controllers/twilioController')

// Middleware
const auth = require('./middleware/authMiddleware')

const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET
}))
app.use(express.static(`${__dirname}/../build`))

// Auth Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.loggedIn)

// Game Endpoints
app.get('/api/games', gameCtrl.getAll)
app.get('/api/games/:id', gameCtrl.getOne)
app.post('/api/games', auth.adminsOnly, gameCtrl.addGame, twilioCtrl.sendAlert)
app.delete('/api/games/:id', auth.adminsOnly, gameCtrl.deleteGame)
app.patch('/api/games/:id', auth.adminsOnly, gameCtrl.updateGame)

// Fav Endpoints
app.post('/api/favs', favCtrl.checkFav)
app.post('/api/newfav', favCtrl.addFav)
app.post('/api/notfav', favCtrl.removeFav)
app.get('/api/favs/:id', favCtrl.getFavs)

// Post Endpoints
app.get('/api/posts/:id', postCtrl.getPosts)
app.post('/api/posts', auth.usersOnly, postCtrl.addPost)
app.delete('/api/posts/:id', postCtrl.deletePost)

// Suggestion Endpoints
app.get('/api/suggestions', suggestCtrl.getSuggestions)
app.post('/api/suggestions', auth.usersOnly, suggestCtrl.addSuggestion)
app.delete('/api/suggestions/:id', suggestCtrl.deleteSuggestion)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})