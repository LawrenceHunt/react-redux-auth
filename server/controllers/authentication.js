const User    = require('../models/user')
const jwt     = require('jwt-simple')
const config  = require('../config')

const tokenForUser = user => {
  const iat = new Date().getTime()
  return jwt.encode({sub: user.id, iat}, config.secret) // sub = subject. iat = issued at time
}

exports.signup = (req, res, next) => {
  const {email, password} = req.body

  User.findOne({email}, (err, existingUser) => {
    if (err) return next(err)

    if (!email || !password) return res.status(422).send({error: 'You must provide email and password.'})

    if (existingUser) return res.status(422).send({error: 'Email is in use.'})

    const user = new User({email, password})

    user.save(err => {
      if (err) return next(err)
    })

    res.json({token: tokenForUser(user)})
  })
}
