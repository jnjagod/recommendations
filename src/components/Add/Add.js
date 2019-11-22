import React, { Component } from 'react'

class Add extends Component {
  state = {
    name: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    description: '',
    players: [],
    difficulty: 0,
    price: 0
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div className='add-outer-box'>
        <div className="add-inner-box">
          <input autoComplete='off' onChange={this.handleChange} placeholder='name' value={this.state.name} name='name' type="text" />
          <button>Add</button>
          <input autoComplete='off' onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img1} name='img1' type="text" />
          <input autoComplete='off' onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img2} name='img2' type="text" />
          <input autoComplete='off' onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img3} name='img3' type="text" />
          <input autoComplete='off' onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img4} name='img4' type="text" />
          <input autoComplete='off' onChange={this.handleChange} placeholder='Add Image URL' value={this.state.img5} name='img5' type="text" />
          <textarea onChange={this.handleChange} placeholder='Description' value={this.state.description} name="description" id="" cols="30" rows="10"></textarea>
          <input onChange={this.handleChange} value={this.state.players} name='players' type="number" />
          <input onChange={this.handleChange} value={this.state.difficulty} name='difficulty' type="number" />
          <input onChange={this.handleChange} value={this.state.price} name='price' type="number" />
        </div>
      </div>
    )
  }
}

export default Add