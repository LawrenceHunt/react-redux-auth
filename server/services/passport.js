const passport    = require('passport')
const User        = require('../models/user')
const config      = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false) // error
    if (user) done(null, user) // found a user...
    else done(null, false) // did not find a user
  })
})

passport.use(jwtLogin)
