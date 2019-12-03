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

  componentDidMount() {
    const { id } = this.props.match.params
    axios
      .get(`/api/games/${id}`)
      .then(res => {
        this.setState(...res.data)
      })
      .catch(err => console.log(err))
  }

  edit = () => {
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

  delete = () => {
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

  toggleStar = () => {
    this.setState({
      toggleFav: !this.state.toggleFav
    })
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
    return (
      <div>
        <main className='game-outer-box dfbox' >
          <div className='game-title-box dfbox'>
            <div className='dfbox'>
              <i onClick={() => this.props.history.push('/games')} className="fas fa-arrow-left"></i>
              {this.state.toggleEdit ? <input autoComplete='off' style={{ marginLeft: '10px' }} onChange={this.handleChange} name='name' value={this.state.name} type="text" /> : <h1> {this.state.name} </h1>}
            </div>
            {!this.state.toggleFav ? <i onClick={this.toggleStar} className='far fa-star fa-2x'></i> : <i onClick={this.toggleStar} className='fas fa-star fa-2x'></i>}
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
          <div className='dfbox admin-box' style={{ visibility: this.props.is_admin ? 'visible' : 'hidden' }} >
            {this.state.toggleEdit ? <button onClick={this.edit} >Done</button> : <button onClick={this.handleEdit} >Edit</button>}
            <button
              onClick={this.delete}
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
  const { is_admin } = reduxState
  return {
    is_admin
  }
}

export default connect(mapStateToProps)(Game)