import React, { Component } from 'react'

class Browser extends Component {
  render() {
    return (
      <div className='browser-outer-box dfcbox'>
        <div className="browser-head">
          <h1>Disclaimer!</h1>
          <p>The prices listed here are in US Dollars and are approximate. They may vary by country and/or website used for purchasing. <br /> Remember to do your own research to get the best price before ordering.</p>
        </div>
        <div className="browser-inner-box dfcbox">
          <div className="browse-type dfbox">
            <p>Show all</p>
            <p>Filter</p>
          </div>
          <div className="filter-bar dfbox">
            <p>Players:</p>
            <select>
              <option value=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
              <option value="">6+</option>
            </select>
            <p>Complexity:</p>
            <select>
              <option value=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
            <p>Price:</p>
            <select>
              <option value=""></option>
              <option value="">Under $25</option>
              <option value="">Under $50</option>
              <option value="">Under $75</option>
              <option value="">Under $100</option>
              <option value="">$125 and Over</option>
            </select>
            <button>Filter</button>
            <button>Reset</button>
          </div>
          <div className="preview-container dfcbox">
            <div onClick={() => this.props.history.push('/games/1')} className="preview-box dfbox">
              <img src='https://images-na.ssl-images-amazon.com/images/I/81crhhZd63L._SY355_.jpg' alt="" />
              <div className='prev-text dfcbox'>
                <h2>Gloomhaven</h2>
                <p>Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world... </p>
                <div className='prev-bot dfbox'>
                  <p>Players: 1-4</p>
                  <p>Complexity: 4</p>
                  <p>Price: $140.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Browser