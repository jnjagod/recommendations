module.exports = {
  adminsOnly: (req, res, next) => {
    if (!req.session.user.is_admin || req.session.user === undefined) {
      return res.status(403).send({ message: 'You are not an Admin.' })
    }
    next()
  }
}