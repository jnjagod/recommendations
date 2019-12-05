import React, { Component } from 'react'
import Gallery from 'react-amazon-gallery'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

class Game extends Component {
  state = {
    game_id: 0,
    imgs: [],
    name: '',
    description: '',
    min_players: 0,
    max_players: 0,
    complexity: 0,
    price: 0,
    toggleEdit: false,
    toggleFav: false
  }

  componentDidMount = () => {
    this.getGame()
    this.checkFav()
  }

  getGame = () => {
    const { id } = this.props.match.params
    axios
      .get(`/api/games/${id}`)
      .then(res => {
        this.setState(...res.data)
      })
      .catch(err => console.log(err))
  }

  checkFav = () => {
    const { user_id } = this.props
    const { id } = this.props.match.params
    const game_id = parseInt(id)
    axios
      .post('/api/favs', { game_id, user_id })
      .then(res => {
        this.setState({ toggleFav: res.data })
      })
      .catch(err => console.log(err))
  }

  addFav = () => {
    const { user_id } = this.props
    const { id } = this.props.match.params
    const game_id = parseInt(id)
    axios
      .post('/api/faves', { user_id, game_id })
      .then(res => {
        this.checkFav()
      })
      .catch(err => console.log(err))
  }

  removeFav = () => {
    const { user_id } = this.props
    const { id } = this.props.match.params
    const game_id = parseInt(id)
    axios
      .post('/api/favers', { user_id, game_id })
      .then(res => {
        this.checkFav()
      })
      .catch(err => console.log(err))
  }

  editGame = () => {
    const { id } = this.props.match.params
    const { name, description, complexity, price } = this.state
    axios
      .patch(`/api/games/${id}`, { name, description, complexity, price })
      .then(res => {
        this.componentDidMount()
        this.handleEdit()
      })
      .catch(err => console.log(err))
  }

  deleteGame = () => {
    const { id } = this.props.match.params
    axios
      .delete(`/api/games/${id}`)
      .then(res => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        })
        this.props.history.push('/games')
      })
      .catch(err => console.log(err))
  }

  handleEdit = () => {
    this.setState({
      toggleEdit: !this.state.toggleEdit
    })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let images = [this.state.imgs[0], this.state.imgs[1], this.state.imgs[2], this.state.imgs[3], this.state.imgs[4]]
    const uri = encodeURI(this.state.name)
    return (
      <div>
        <main className='game-outer-box dfbox' >
          <div className='game-title-box dfbox'>
            <div className='dfbox'>
              <i onClick={() => window.history.back()} className="fas fa-arrow-left"></i>
              {this.state.toggleEdit ? <input autoComplete='off' style={{ marginLeft: '10px' }} onChange={this.handleChange} name='name' value={this.state.name} type="text" /> : <a target='_blank' rel="noopener noreferrer" href={`https://www.amazon.com/s?k=${uri}&ref=nb_sb_noss_2`}> {this.state.name} </a>}
            </div>
            {!this.state.toggleFav ? <i onClick={this.addFav} className='far fa-star fa-2x'></i> : <i onClick={this.removeFav} className='fas fa-star fa-2x'></i>}
          </div>
          <div className='gallery-box'>
            <Gallery images={images} width='500' main={{ overlay: false, orientation: 'horizontal', hlColor: 'navy', hlSize: 10, size: 30 }} />
          </div>
          <div className='desc-box'>
            {this.state.toggleEdit ? <textarea autoComplete='off' className='add-desc' onChange={this.handleChange} name="description" value={this.state.description} id="" cols="30" rows="10"></textarea> : <p className='game-desc' > {this.state.description} </p>}
          </div>
          <div className='game-bot-box dfbox'>
            <div>
              <p className='attr'>Players:</p>
              <p> {this.state.min_players}-{this.state.max_players} </p>
            </div>
            <div>
              <p className='attr'>Complexity:</p>
              {this.state.toggleEdit ? <input autoComplete='off' className='small-input' onChange={this.handleChange} name='complexity' value={this.state.complexity} type="number" /> : <p> {this.state.complexity} </p>}
            </div>
            <div>
              <p className='attr'>Price:</p>
              {this.state.toggleEdit ? <input autoComplete='off' className='small-input' onChange={this.handleChange} name='price' value={this.state.price} type="number" /> : <p> ${this.state.price} </p>}
            </div>
          </div>
          <p className='amazon'>Click the title to check Amazon.com prices!</p>
          <div className='dfbox admin-box' style={{ visibility: this.props.is_admin ? 'visible' : 'hidden' }} >
            {this.state.toggleEdit ? <button onClick={this.editGame} >Done</button> : <button onClick={this.handleEdit} >Edit</button>}
            <button
              onClick={this.deleteGame}
            >Delete</button>
          </div>
        </main>
        <div className='comments-box'>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  const { is_admin, user_id } = reduxState
  return {
    is_admin,
    user_id
  }
}

export default connect(mapStateToProps)(Game)