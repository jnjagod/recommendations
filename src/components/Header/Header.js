import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { logout, updateUser } from '../../ducks/reducer'

class Header extends Component {
  // componentDidMount() {
  //   axios
  //     .get('/auth/me')
  //     .then(res => {
  //       console.log(res)
  //       this.props.updateUser(res.data.user)
  //     })
  //     .catch(err => console.log(err))
  // }

  logout = () => {
    axios
      .delete('/auth/logout')
      .then(res => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          timer: 1200
        })
        this.props.logout()
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
            <img className='profile-img' src='https://robohash.org/1' alt="" />
            <p>username</p>
          </div>
          <div>
            <h1>A Thing is Here</h1>
            <p className='sub-header'>Here is smaller.</p>
          </div>
          <div className='header-button-box'>
            <Link style={{ visibility: this.props.location.pathname === '/dashboard' && 'hidden' }} to='/dashboard'>
              <button>Dashboard</button>
            </Link>
            <Link to='/'>
              <button onClick={logout}>Logout</button>
            </Link>
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