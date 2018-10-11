const passport      = require('passport')
const User          = require('../models/user')
const config        = require('../config')
const JwtStrategy   = require('passport-jwt').Strategy
const ExtractJwt    = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// create local strategy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify this username and password, call done with the user if correct email & password
  User.findOne({email}, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    // compare passwords
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (!isMatch) return done(null, false)

      return done(null, user)
    })
  })
})

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
passport.use(localLogin)
