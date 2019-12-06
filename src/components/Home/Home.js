import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'

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

  register = () => {
    const { username, password } = this.state
    if (username && password) {
      axios
        .post('/auth/register', { username, password })
        .then(res => {
          this.props.updateUser(res.data.user)
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            timer: 1200,
            showConfirmButton: false
          })
          this.props.history.push('/dashboard')
        })
        .catch(err => Swal.fire({
          title: err.response.data.message,
          icon: 'error'
        }))
    } else {
      Swal.fire({
        title: 'Please enter a username and password.',
        icon: 'error',
      })
    }
  }

  login = () => {
    const { username, password } = this.state
    axios
      .post('/auth/login', { username, password })
      .then(res => {
        this.props.updateUser(res.data.user)
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        })
        this.props.history.push('/dashboard')
      })
      .catch(err => Swal.fire({
        title: err.response.data.message,
        icon: 'error'
      }))
  }

  render() {
    return (
      <div className='home dfcbox'>
        <div className='home-inner-box dfcbox'>
          <h1 id='welcome'>Welcome!</h1>
          <p>First time visiting? Go ahead and register.</p>
          <p>If not, you can just log in.</p>
          <div className='log-box dfcbox'>
            <input autoComplete='off' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' type="text" />
            <input autoComplete='off' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' type="password" />
            <button onClick={this.login}>Login</button>
            <button onClick={this.register}>Register</button>
          </div>
          <p>If you're curious about the purpose of this place, click <p style={{display: 'inline', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {this.props.history.push('/about')}}>here</p> for a brief explanation.</p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(Home)