import React, { Component } from 'react'

class Home extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <input autoComplete='off' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' type="text" />
        <input autoComplete='off' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' type="password" />
        <button>Login</button>
        <button>Register</button>
      </div>
    )
  }
}

export default Home