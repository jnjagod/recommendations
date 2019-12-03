import React, { Component } from 'react'
import axios from 'axios'

class Browser extends Component {
  state = {
    games: [],
    players: 0,
    complexity: 0,
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
      complexity: 0,
      price: 0
    })
  }

  render() {
    let allGames = this.state.games.map(game => (
      <div key={game.game_id} onClick={() => this.props.history.push(`/games/${game.game_id}`)} className="preview-box dfbox">
        <img src={game.imgs[0]} alt="" />
        <div className='prev-text dfcbox'>
          <h2>{game.name}</h2>
          <p> {game.description.substr(0, 258)}... </p>
          <div className='prev-bot dfbox'>
            <p>Players: {game.min_players}-{game.max_players} </p>
            <p>Complexity: {game.complexity} </p>
            <p>Price: ${game.price} </p>
          </div>
        </div>
      </div>
    ))
    return (
      <div className='browser-outer-box dfcbox'>
        <div className="browser-head">
          <h1>Disclaimer!</h1>
          <p>The prices listed here are in US Dollars and are approximate. They may vary by country and/or website used for purchasing. <br /> Remember to do your own research to get the best price before ordering.</p>
        </div>
        <div className="browser-inner-box dfcbox">
          <div className="browse-type dfbox">
            <p>Show all</p>
            <p>Filter</p>
          </div>
          <div className="filter-bar dfbox">
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
            <p>Complexity:</p>
            <select name='complexity' onChange={this.handleNum}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <p>Price:</p>
            <select name='price' onChange={this.handleNum}>
              <option value=""></option>
              <option value="25">Under $25</option>
              <option value="50">Under $50</option>
              <option value="75">Under $75</option>
              <option value="100">Under $100</option>
              <option value="125">$125 and Over</option>
            </select>
            <button>Filter</button>
            <button
            onClick={this.resetFields}
            >Reset</button>
          </div>
          <div className="preview-container dfcbox">
            {allGames}
          </div>
        </div>
      </div>
    )
  }
}

export default Browser