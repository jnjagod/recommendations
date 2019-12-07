module.exports = {
  usersOnly: (req, res, next) => {
    if (!req.session.user) {
      return res.status(403).send({message: 'You must be logged in to do that.'})
    }
    next()
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.is_admin || req.session.user === undefined) {
      return res.status(403).send({ message: 'You are not an Admin.' })
    }
    next()
  }
}