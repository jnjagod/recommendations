module.exports = {
  getFavs: (req, res) => {

  },
  checkFav: async (req, res) => {
    const db = req.app.get('db')
    const { game_id, user_id } = req.body
    const found = await db.check_fav({ game_id, user_id })
    if (+found[0].count !== 0) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
  },
  addFav: (req, res) => {
    const db = req.app.get('db')
    const { game_id, user_id } = req.body
    db.add_fav({ game_id, user_id })
      .then(result => {
        res.status(200).send({ message: 'Added to Favorites.' })
      })
      .catch(err => console.log(err))
  },
  removeFav: (req, res) => {
    const db = req.app.get('db')
    const { game_id, user_id } = req.body
    db.remove_fav({ game_id, user_id })
      .then(result => {
        res.status(200).send({ message: 'Removed from Favorites.' })
      })
      .catch(err => console.log(err))
  }
}