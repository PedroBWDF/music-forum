const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
    if (err) {
      console.error('Error during authentication:', err)
      return res.status(401).json({ status: 'error', message: 'unauthorized' })
    }
    if (!user) {
      console.warn('No user found or token invalid:', info)
      return res.status(401).json({ status: 'error', message: 'unauthorized' })
    }
    req.user = user.toJSON()
    console.log('Req.user:', user.toJSON())
    next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(403).json({ status: 'error', message: 'permission denied' })
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
