import React, { Component } from 'react'
import { connect } from 'react-redux'

class Add extends Component {
  state = {
    name: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    description: '',
    min: 0,
    max: 0,
    difficulty: 0,
    price: 0
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
    // if (this.props.is_admin) {
    return (
      <div className='add-outer-box'>
        <div className="add-inner-box">
          <button className='add-button'>Add</button>
          <form autoComplete='off' action="">
            <div className="top-box">
                <p>Name:</p>
                <input autoFocus onChange={this.handleChange} placeholder='Name' value={this.state.name} name='Name' type="text" className='name-input' />
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
                <input min='1' max='99' className='small-input' onChange={this.handleNum} value={this.state.players} name='min' type="number" />
                <p>Max Players:</p>
                <input min='1' max='99' className='small-input' onChange={this.handleNum} value={this.state.players} name='max' type="number" />
              </div>
              <div className='select-box'>
                <p>Complexity:</p>
                <select onChange={this.handleNum} name='difficulty'>
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
    // } else { return null }
  }
}

function mapStateToProps(reduxState) {
  const { is_admin } = reduxState
  return { is_admin }
}

export default connect(mapStateToProps)(Add)