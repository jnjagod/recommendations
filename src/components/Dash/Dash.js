import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dash extends Component {
  render() {
    return (
      <div className='dash-outer-box'>
        <div className='dash-inner-box'>
          <Link className='dash-box' to='/games'>
            <i className="fas fa-search fa-8x"></i>
            <h1>Browse</h1>
          </Link>
          <Link className='dash-box' to='/favorites'>
            <i className="fas fa-star fa-8x"></i>
            <h1>My Favorites</h1>
          </Link>
          <Link style={{ visibility: this.props.is_admin ? "visible" : "hidden" }} className='dash-box' to='/new'>
            <i className="fas fa-plus-circle fa-8x"></i>
            <h1>Add Game</h1>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  const { is_admin } = reduxState
  return { is_admin }
}

export default connect(mapStateToProps)(Dash)