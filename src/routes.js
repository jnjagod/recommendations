import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Add from './components/Add/Add'
import Dash from './components/Dash/Dash'
import Game from './components/Game/Game'
import Browser from './components/Browser/Browser'
import Fav from './components/Fav/Fav'
import About from './components/About/About'
import Suggestions from './components/Suggestions/Suggestions'

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/new' component={Add} />
    <Route path='/dashboard' component={Dash} />
    <Route path='/games/:id' component={Game} />
    <Route path='/games' component={Browser} />
    <Route path='/favorites' component={Fav} />
    <Route path='/about' component={About} />
    <Route path='/suggestions' component={Suggestions} />
  </Switch>
)