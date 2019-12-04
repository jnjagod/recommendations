import React, { Component } from 'react'
import { connect } from 'react-redux'

class Fav extends Component {
  state = {
    favorites: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        Jim
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return { reduxState }
}

export default connect(mapStateToProps)(Fav)