module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get('db')
    const games = await db.get_all()
    res.status(200).send(games)
  },
  getOne: async (req, res) => {
    const db = req.app.get('db')
    const { id: game_id } = req.params
    const game = await db.get_one({ game_id })
    res.status(200).send(game)
  },
  addGame: (req, res, next) => {
    const db = req.app.get('db')
    const { imgs, name, description, min_players, max_players, complexity, price } = req.body
    db.add_game({ imgs, name, description, min_players, max_players, complexity, price })
      .then(result =>
        res.status(201).send({ message: 'Game Added.' })
      )
      .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
      })
    next()
  },
  deleteGame: (req, res) => {
    const db = req.app.get('db')
    const { id: game_id } = req.params
    db.delete_game({ game_id })
    res.status(200).send({ message: 'Game Deleted.' })
  },
  updateGame: async (req, res) => {
    const db = req.app.get('db')
    const { id: game_id } = req.params
    const { name, description, complexity, price } = req.body
    const updatedGame = await db.update_game({ game_id, name, description, complexity, price })
    res.status(202).send(updatedGame)
  }
}