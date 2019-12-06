import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

class Add extends Component {
  state = {
    name: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    description: '',
    min_players: 0,
    max_players: 0,
    complexity: 0,
    price: 0
  }

  handleAdd = () => {
    const { name, img1, img2, img3, img4, img5, description, min_players, max_players, complexity, price } = this.state
    axios
      .post('/api/games', { imgs: [img1, img2, img3, img4, img5], name, description, min_players, max_players, complexity, price })
      .then(res => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        })
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error'
        })
      })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleNum = e => {
    const { name, value } = e.target
    this.setState({
      [name]: +value
    })
  }

  handlePrice = e => {
    const { value } = e.target
    let positive = Math.abs(+value).toFixed(2)
    this.setState({ price: +positive })
  }

  render() {
    return (
      <div className='add-outer-box'>
        <div className="add-inner-box">
          <button
            onClick={this.handleAdd}
            className='add-button'>Add Game</button>
          <form autoComplete='off' action="">
            <div className="top-box">
              <p>Name:</p>
              <input onChange={this.handleChange} placeholder='Name' value={this.state.name} name='name' type="text" className='name-input' />
            </div>
            <div className="imgurl-box">
              <p>Image URLs:</p>
              <input onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img1} name='img1' type="text" />
              <input onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img2} name='img2' type="text" />
              <input onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img3} name='img3' type="text" />
              <input onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img4} name='img4' type="text" />
              <input onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img5} name='img5' type="text" />
            </div>
            <p>Description:</p>
            <textarea className='add-desc' onChange={this.handleChange} placeholder='Description' value={this.state.description} name="description" id="" ></textarea>
            <div className="bottom-box">
              <div>
                <p>Min Players:</p>
                <input min='1' max='99' className='small-input' onChange={this.handleNum} value={this.state.players} name='min_players' type="number" />
                <p>Max Players:</p>
                <input min='1' max='99' className='small-input' onChange={this.handleNum} value={this.state.players} name='max_players' type="number" />
              </div>
              <div className='select-box'>
                <p>Complexity:</p>
                <select onChange={this.handleNum} name='complexity'>
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <p>Price:</p>
                <input className='small-input' onChange={this.handlePrice} name='price' type="number" min='0' />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  const { is_admin } = reduxState
  return { is_admin }
}

export default connect(mapStateToProps)(Add)