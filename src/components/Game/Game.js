import React, { Component } from 'react'
import Gallery from 'react-amazon-gallery'
import { connect } from 'react-redux'

class Game extends Component {
  state = {
    toggleEdit: false,
    toggleFav: false
  }

  toggleStar = () => {
    this.setState({
      toggleFav: !this.state.toggleFav
    })
  }
  render() {
    let images = ['https://images-na.ssl-images-amazon.com/images/I/81crhhZd63L._SY355_.jpg', 'https://cdn.anyfinder.eu/assets/cc69d46722461bc7596847fea0373dda8238c851fbf9c4f9bf2aa6aa532f756b', 'https://cdn.arstechnica.net/wp-content/uploads/2017/04/Gloomhaven31.jpg', 'http://nerdologists.com/wp-content/uploads/2018/01/Gloomhaven-Dungeon.jpg', 'https://cf.geekdo-images.com/imagepagezoom/img/l9M5SHyM8pk9eVh4UeE0-vhJaM4=/fit-in/1200x900/filters:no_upscale()/pic2653835.jpg']
    return (
      <div>
        <main className='game-outer-box dfbox' >
          <div className='game-title-box dfbox'>
            <div className='dfbox'>
              <i onClick={() => this.props.history.push('/games')} className="fas fa-arrow-left"></i>
              <h1>Gloomhaven</h1>
            </div>
            {!this.state.toggleFav ? <i onClick={this.toggleStar} className='far fa-star fa-2x'></i> : <i onClick={this.toggleStar} className='fas fa-star fa-2x'></i>}
          </div>
          <div className='gallery-box'>
            <Gallery images={images} width='500' main={{ overlay: false, orientation: 'horizontal', hlColor: 'navy', hlSize: 10, size: 30 }} />
          </div>
          <div className='desc-box'>
            <p className='game-desc' >Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process, they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make.
          <br />
              <br />
              This is a game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a “Choose Your Own Adventure” book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn.
          <br />
              <br />
              Each turn, a player chooses two cards to play out of their hand. The number on the top card determines their initiative for the round. Each card also has a top and bottom power, and when it is a player’s turn in the initiative order, they determine whether to use the top power of one card and the bottom power of the other, or vice-versa. Players must be careful, though, because over time they will permanently lose cards from their hands. If they take too long to clear a dungeon, they may end up exhausted and be forced to retreat.</p>
          </div>
          <div className='game-bot-box dfbox'>
            <div>
              <p className='attr'>Players:</p>
              <p>1-4</p>
            </div>
            <div>
              <p className='attr'>Complexity:</p>
              <p>4</p>
            </div>
            <div>
              <p className='attr'>Price:</p>
              <p>$140.00</p>
            </div>
          </div>
          <div className='dfbox admin-box'>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </main>
        <div className='comments-box'>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(Game)