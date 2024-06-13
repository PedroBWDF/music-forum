const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { User } = db

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) {
      throw new Error('Passwords do not match!')
    }

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          throw new Error('Email already exists!')
        }
        return bcrypt.hash(req.body.password, 10)
      })

      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/music')
      })
      .catch(err => next(err))
  },

  logInPage: (req, res) => {
    res.render('login')
  },

  logIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password // 刪除密碼
      // console.log('User Data in signIn:', userData)

      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' }) // 將 req.user 改成 userData

      res.cookie('jwt', token, {
        httpOnly: true, // 仅通过 HTTP 传输，防止客户端 JavaScript 访问
        // secure: process.env.NODE_ENV === 'production', // 仅在生产环境中启用 HTTPS
        // maxAge: 30 * 24 * 60 * 60 * 1000 // 30 天
        data: {
          user: userData
        }
      })

      req.flash('success_messages', '成功登入！')
      console.log('Redirecting to /music')
      res.redirect('/music')
    } catch (err) {
      next(err)
    }
  }

  // logout: (req, res) => {

  // }
}
module.exports = userController
