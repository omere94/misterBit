const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  // console.log('req session',req.session);
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!')
    return
  }
  next()
}

async function requireAdmin(req, res, next) {
  if(!req.session.user) return
  console.log('req session on require',req.session);
  const user = req.session.user

  if (!user.isAdmin) {
    logger.warn(user.fullname + ' Attempt to perform admin action')
    res.status(401).end('Unauthorized Enough..')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
