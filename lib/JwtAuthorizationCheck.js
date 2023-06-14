const JWT = require('jsonwebtoken')

function JwtAuthorizationCheck(req, res, next) {
  const token = req.cookies.token
  if (token) {
    try {
      const validToken = JWT.verify(token, process.env.JWT_SECRET)
      console.log('token:', validToken)
      next()
    } catch (error) {
      console.log('error:', error)
      res.status(401).send('NOT AUTHORIZED')
    }
  } else {
    res.status(401).send('NOT AUTHORIZED')
  }
}

module.exports = { JwtAuthorizationCheck }