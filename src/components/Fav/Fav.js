import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './_fav.scss'

class Fav extends Component {
  state = {
    favorites: []
  }

  componentDidMount() {
    const { user_id } = this.props
    axios
      .get(`/api/favs/${user_id}`)
      .then(res => this.setState({ favorites: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    let myFavs = this.state.favorites.map(game => (
      <div key={game.game_id} onClick={() => this.props.history.push(`/games/${game.game_id}`)} className='fav-box dfbox'>
        <img src={game.imgs} alt="" />
        <h1>{game.name}</h1>
      </div>
    ))
    return (
      <div className='fav-outer-box dfcbox'>
        <div className='dfbox'>
          <i className='fas fa-star fa-2x'></i>
          <h1 className='fav-title'>My Favorites</h1>
        </div>
        <div className='fav-inner-box'>
          {myFavs}
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  const { user_id } = reduxState
  return { user_id }
}

export default connect(mapStateToProps)(Fav)