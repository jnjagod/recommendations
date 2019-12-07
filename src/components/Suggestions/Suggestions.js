import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

class Suggestions extends Component {
  state = {
    suggestions: [],
    title: ''
  }

  componentDidMount() {
    this.getSuggestions()
  }

  getSuggestions = () => {
    axios
      .get('/api/suggestions')
      .then(res => this.setState({ suggestions: res.data }))
      .catch(err => console.log(err))
  }

  addSuggestion = () => {
    const { title } = this.state
    const { user_id } = this.props
    axios
      .post('/api/suggestions', { user_id, title })
      .then(res => {
        this.getSuggestions()
        this.setState({ title: '' })
      })
      .catch(err => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error'
        })
      })
  }

  deleteSuggestion(id) {
    axios
      .delete(`/api/suggestions/${id}`)
      .then(res => {
        this.getSuggestions()
      })
      .catch(err => console.log(err))
  }


  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let suggestMap = this.state.suggestions.map(suggest => (
      <div key={suggest.suggest_id} className="suggest-box">
        <div className="suggest-text dfbox">
          <p>{suggest.title}</p>
        </div>
        <div style={{ visibility: this.props.is_admin || suggest.username === this.props.username ? 'visible' : 'hidden' }} onClick={() => { this.deleteSuggestion(suggest.suggest_id) }} className="delete-post">
          <i className="far fa-trash-alt"></i>
        </div>
        <div className='suggest-user dfbox'>
          <p>Suggested by {suggest.username}</p>
          <img src={suggest.profile_img} alt="" />
        </div>
      </div>
    ))
    return (
      <>
        <div className='suggest-outer-box dfbox'>
          <div className="suggest-inner-box dfcbox">
            <h1>Community Suggestions</h1>
            <section className='posting-box dfbox'>
              <input autoComplete='off' name='title' value={this.state.title} onChange={this.handleChange} placeholder='Title' maxLength='100' type="text" />
              <button
                onClick={() => {
                  this.addSuggestion();
                }}
              >Suggest</button>
            </section>
            <div className="suggest-display dfcbox">
              {suggestMap}
            </div>
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(reduxState) {
  const { is_admin, user_id, username, profile_img } = reduxState
  return {
    is_admin,
    user_id,
    username,
    profile_img
  }
}

export default connect(mapStateToProps)(Suggestions)