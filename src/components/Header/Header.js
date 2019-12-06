import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { logout, updateUser } from '../../ducks/reducer'

class Header extends Component {
  componentDidMount() {
    this.getMe()
  }

  getMe() {
    axios
      .get('/auth/me')
      .then(res => {
        this.props.updateUser(res.data.user)
      })
      .catch(err => console.log(err))
  }

  logout = () => {
    axios
      .post('/auth/logout')
      .then(res => {
        this.props.logout()
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        })
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  render() {
    if (this.props.location.pathname === '/' || this.props.location.pathname === '/about') {
      return (
        <header className='main-header'>
          <div className='header-user-box'>
            <img className='profile-img' src='https://static.thenounproject.com/png/1151432-200.png' alt="" />
          </div>
          <div className='site-header'>
            <h1>Table Time Games</h1>
            <p className='sub-header'>For board game fanatics.</p>
          </div>
          <div style={{ visibility: 'hidden' }} className='header-button-box'>
            <button>Dashboard</button>
            <button>Logout</button>
          </div>
        </header>
      )
    } else {
      return (
        <header className='main-header'>
          <div className='header-user-box'>
            <img className='profile-img' src={this.props.profile_img} alt="" />
            <p>{this.props.username}</p>
          </div>
          <div className='site-header'>
            <h1>Table Time Games</h1>
            <p className='sub-header'>For board game fanatics.</p>
          </div>
          <div className='header-button-box'>
            <Link style={{ visibility: this.props.location.pathname === '/dashboard' && 'hidden' }} to='/dashboard'>
              <button>Dashboard</button>
            </Link>
            <button onClick={this.logout}>Logout</button>
          </div>
        </header>
      )
    }
  }
}

function mapStateToProps(reduxState) {
  const { username, profile_img } = reduxState
  return {
    username,
    profile_img
  }
}

const mapDispatchToProps = {
  logout,
  updateUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))