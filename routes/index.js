const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const musicController = require('../controllers/music-controller')
const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const checkUser = require('../middleware/check-user')
const { generalErrorHandler } = require('../middleware/error-handler')

// 引入admin
const admin = require('./modules/admin')

router.post('/comments', authenticated, commentController.postComment)

router.get('/music', checkUser, musicController.getAllMusic)
router.get('/songs/:id', checkUser, musicController.getSong)

router.use('/admin', authenticated, authenticatedAdmin, admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/login', userController.logInPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', session: false, failureFlash: true }), userController.logIn)
router.get('/logout', userController.logout)

router.use('/', generalErrorHandler)

// router.use為路由加上middleware。若上面路由都未符合，就redirect到/music
router.use('/', (req, res) => {
  res.redirect('/music')
})

module.exports = router
