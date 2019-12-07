import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <div className='about-outer dfcbox'>
        <div className="about-inner dfcbox">
          <div className='about-title-box dfbox'>
            <i onClick={() => window.history.back()} className="fas fa-arrow-left fa-2x"></i>
            <h1>About</h1>
          </div>
          <div className="about-text">
            <h2>What is Table Time Gaming all about?</h2>
            <p>This website is all about board games and getting more people to play them. The overarching goal here is to help people who have only played a limited number of titles expand their list of interests and lead them to get involved in their local board game communities.</p>
            <h2>What can I do here?</h2>
            <p>You can view a list of board games, then select an individual game to learn more about. Included are links to check Amazon for the current price on their website. You can also add any of the games to your individual favorites list, allowing you to keep a separate set of games for something like a tracker or a wishlist. If you see a particular game that you are a fan of, you can add your comments to the bottom of the game page to share your personal thoughts with others. Finally, if you have a specific game you want to share but don't see here, you can put it in our suggestions list and may see it eventually added.</p>
            <h2>Why isn't there a grading system?</h2>
            <p>The games presented here have been selected from several sources of trusted recommendations. There is no grading system because they are all either highly recommended or highly suggested by the community here.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About