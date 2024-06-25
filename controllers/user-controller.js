const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const db = require('../models')
// const { User } = db
const { User } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers') // 讓程式可以把image檔案傳到 file-helper 處理

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
        httpOnly: true, // 防止客户端 JavaScript 存取
        data: {
          user: userData
        }
      })

      req.flash('success_messages', '成功登入！')
      // console.log('Redirecting to /music')
      res.redirect('/music')
    } catch (err) {
      next(err)
    }
  },

  logout: (req, res) => {
    req.flash('success_messages', '成功登出了！')
    res.clearCookie('jwt') // express文件有寫
    res.redirect('/music')
  },

  getUser: (req, res, next) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("The user doesn't exist!")
        // user = user.toJSON()
        // console.log('user:', user)
        res.render('users/profile', { user: res.locals.user })
      })
      .catch(err => next(err))
  },

  editUser: (req, res, next) => {
    return User.findByPk(req.params.id)

      .then(user => {
        if (!user) throw new Error("The user doesn't exist!")
        res.render('users/edit', { user: res.locals.user })
      })
      .catch(err => next(err))
  },

  putUser: (req, res, next) => {
    if (Number(req.params.id) !== Number(req.user.id)) { // 確保只有用戶才可以編輯自己的資料
      throw new Error('You are not authorized')
    }

    const { name } = req.body
    const { file } = req // 把檔案取出來，也可以寫成 const file = req.file

    return Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file) // 把image檔案傳到 file-helper 處理
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist!")

        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  }
}
module.exports = userController
