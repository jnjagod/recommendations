module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const { id: game_id } = req.params
    const posts = await db.get_posts({ game_id })
    res.status(200).send(posts)
  },
  addPost: (req, res) => {
    const db = req.app.get('db')
    const { game_id, user_id, content } = req.body
    if (!content) {
      return res.status(406).send({ message: 'Please type a comment before posting.' })
    }
    db.add_post({ game_id, user_id, content })
    res.status(200).send({ message: 'Posted.' })
  },
  deletePost: (req, res) => {
    const db = req.app.get('db')
    const { id: post_id } = req.params
    db.delete_post({ post_id })
    res.status(200).send({ message: 'Deleted.' })
  }
}