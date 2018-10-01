const User = require('../models/user')

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

    res.json({success: true})
  })
}
