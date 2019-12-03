import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { logout, updateUser } from '../../ducks/reducer'

class Header extends Component {
  componentDidMount() {
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
    if (this.props.location.pathname === '/') {
      return null
    } else {
      return (
        <header className='main-header'>
          <div className='header-user-box'>
            <img className='profile-img' src={this.props.profile_img} alt="" />
            <p>{this.props.username}</p>
          </div>
          <div className='site-header'>
            <h1>A Thing is Here</h1>
            <p className='sub-header'>Here is smaller.</p>
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
  return reduxState
}

const mapDispatchToProps = {
  logout,
  updateUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))