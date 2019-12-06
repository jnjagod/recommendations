import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

class Browser extends Component {
  state = {
    games: [],
    players: 0,
    price: 0,
    filter: false
  }

  componentDidMount = () => {
    this.getAll()
  }

  getAll = () => {
    axios
      .get('/api/games')
      .then(res => {
        this.setState({ games: res.data })
      })
      .catch(err => console.log(err))
  }

  handleNum = e => {
    const { name, value } = e.target
    this.setState({
      [name]: +value
    })
  }

  resetFields = () => {
    this.setState({
      players: 0,
      price: 0
    })
  }

  complex = () => {
    Swal.fire({
      title: 'What is Complexity?',
      text: 'As it is used here, complexity represents a rating of how difficult a game is to understand. A higher complexity rating generally means that more time needs to be invested into reading the rules to properly play the game.',
      icon: 'question'
    })
  }

  gamesMap = arr => arr.map(game => (
    <div key={game.game_id} className="preview-box dfbox">
      <img onClick={() => this.props.history.push(`/games/${game.game_id}`)} src={game.imgs[0]} alt="" />
      <div className='prev-text dfcbox'>
        <h2 onClick={() => this.props.history.push(`/games/${game.game_id}`)} className='prev-name'>{game.name}</h2>
        <p onClick={() => this.props.history.push(`/games/${game.game_id}`)} className='prev-desc'> {game.description.substr(0, 258)}... </p>
        <div className='prev-bot dfbox'>
          <p>Players: {game.min_players}-{game.max_players} </p>
          <p onClick={this.complex} className='complex'>Complexity: {game.complexity} </p>
          <p>Price: ${game.price} </p>
        </div>
      </div>
    </div>
  ))

  render() {
    const { games, players, price } = this.state
    let allGames = this.gamesMap(games)
    let filterGames = games.filter(game => {
      const { min_players, max_players } = game
      if (players && price) {
        return min_players <= players && players <= max_players && game.price <= price
      } else if (players && !price) {
        return min_players <= players && players <= max_players
      } else if (!players && price) {
        return game.price <= price
      } else {
        return []
      }
    })
    return (
      <div className='browser-outer-box dfcbox'>
        <div className="browser-head">
          <h1>Disclaimer!</h1>
          <p>The prices listed here are in US Dollars and are approximate. They may vary by country and/or website used for purchasing. <br /> Remember to do your own research to get the best price before ordering.</p>
        </div>
        <div className="browser-inner-box dfcbox">
          <div className="browse-type dfbox">
            <p id='showAll' onClick={() => this.setState({ filter: false })}>Show all</p>
            <p id='filter' onClick={() => this.setState({ filter: true })}>Filter</p>
          </div>
          <div style={{ visibility: this.state.filter ? 'visible' : 'hidden' }} id='bar' className="filter-bar dfbox">
            <p>Players:</p>
            <select name='players' onChange={this.handleNum}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6+</option>
            </select>
            <p>Price:</p>
            <select name='price' onChange={this.handleNum}>
              <option value=""></option>
              <option value="25">Under $25</option>
              <option value="50">Under $50</option>
              <option value="75">Under $75</option>
              <option value="100">Under $100</option>
            </select>
          </div>
          <div className="preview-container dfcbox">
            {this.state.filter ? this.gamesMap(filterGames) : allGames}
          </div>
        </div>
      </div>
    )
  }
}

export default Browser