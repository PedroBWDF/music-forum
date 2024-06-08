const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const musicController = require('../controllers/music-controller')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

// 引入admin
const admin = require('./modules/admin')

router.get('/music', musicController.getAllMusic)

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/login', userController.logInPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', session: false, failureFlash: true }), userController.logIn)

router.use('/', generalErrorHandler)

// router.use為路由加上middleware。若上面路由都未符合，就redirect到/music
router.use('/', (req, res) => {
  res.redirect('/music')
})

module.exports = router
