const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User, Song } = require('../models')
// const db = require('../models')
// const User = db.User

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    // console.log('LocalStrategy: Checking user with email:', email)
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

        bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) {
              return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            }
            // console.log('LocalStrategy: User found:', user)
            return cb(null, user)
          })
      })
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  // console.log('JWT payload:', jwtPayload)
  User.findByPk(jwtPayload.id, {
    // include: [
    //   { model: User, as: 'Followers' },
    //   { model: User, as: 'Followings' }
    // ]
    include: [
      { model: Song, as: 'LikedSongs' }
    ]
  })
    .then(user => {
      console.log('user:', user)
      if (user) {
        // console.log('User found:', user)
        return cb(null, user)
      } else {
        console.warn('No user found with id:', jwtPayload.id)
        return cb(null, false)
      }
    })

    .catch(err => {
      console.error('Error during user lookup:', err)
      return cb(err)
    })
}))

// passport.serializeUser((user, cb) => {
//   cb(null, user.id)
// })
// passport.deserializeUser((id, cb) => {
//   User.findByPk(id).then(user => {
//     console.log(user)
//     暫時添加
//     console.log('deserializeUser: User found:', user)
//     return cb(null, user)
//   })
// })

module.exports = passport
