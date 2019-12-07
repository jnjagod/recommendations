module.exports = {
  getSuggestions: async (req, res) => {
    const db = req.app.get('db')
    const suggestions = await db.get_suggest()
    res.status(200).send(suggestions)
  },
  addSuggestion: async (req, res) => {
    const db = req.app.get('db')
    const { user_id, title } = req.body
    const found = await db.check_suggest({ title })
    if (+found[0].count !== 0) {
      return res.status(409).send({ message: 'Title already suggested.' })
    }
    db.add_suggest({ user_id, title })
    res.status(200).send({ message: 'Added.' })
  },
  deleteSuggestion: (req, res) => {
    const db = req.app.get('db')
    const { id: suggest_id } = req.params
    db.delete_suggest({ suggest_id })
    res.status(200).send({ message: 'Deleted.' })
  }
}